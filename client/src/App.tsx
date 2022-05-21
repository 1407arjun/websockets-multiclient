import { VStack, Heading, Divider } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import Stack from "./components/Stack"
import type Stream from "./types/stream"
import Message, { MessageType } from "./types/message"

export default function App() {
    const [streams, setStreams] = useState<Stream[]>([])

    useEffect(() => {
        let ws = new WebSocket("ws://localhost:5000")

        ws.onopen = () => {
            console.log("WebSocket Client Connected")
            ws.send("Hello")
        }
        ws.onmessage = (ev) => {
            const message: Message = JSON.parse(ev.data)

            switch (message.type) {
                case MessageType.ADD:
                    setStreams((prev) => {
                        return [
                            ...prev,
                            {
                                id: message.id,
                                value: message.value!
                            }
                        ]
                    })
                    break
                case MessageType.UPDATE:
                    setStreams((prev) => {
                        prev.every((s) => {
                            if (s.id === message.id) {
                                s.value = message.value!
                                return false
                            }
                            return true
                        })
                        return prev
                    })
                    break
                case MessageType.REMOVE:
                    setStreams((prev) => {
                        prev = prev.filter((s) => {
                            return s.id !== message.id
                        })
                        return prev
                    })
                    break
                default:
                    break
            }
        }
    })

    return (
        <VStack
            p={{ base: 8, xl: 16 }}
            minH="100vh"
            bgColor="gray.900"
            color="gray.200">
            <Heading size="xl" textAlign="center">
                Subscribe and Unsubscribe
            </Heading>
            <Divider orientation="horizontal" />
            <Stack streams={streams} />
        </VStack>
    )
}
