import { VStack, Heading, Divider } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import Stack from "./components/Stack"
import type Stream from "./types/stream"
import Message, { MessageType } from "./types/message"
import SocketContext from "./components/SocketContext"

let ws = new WebSocket("ws://localhost:5000")

export default function App() {
    const [streams, setStreams] = useState<Stream[]>([])

    useEffect(() => {
        ws.onopen = () => {
            console.log("WebSocket Client Connected")
        }

        ws.onmessage = (ev) => {
            const message: Message = JSON.parse(ev.data)
            console.log(message)

            switch (message.type) {
                case MessageType.INIT:
                    setStreams(message.streams!)
                    break
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
                        return prev.map((st) => {
                            message.streams!.every((s) => {
                                if (st.id === s.id) {
                                    st.value = s.value!
                                    return false
                                }
                                return true
                            })
                            return st
                        })
                    })
                    break
                case MessageType.REMOVE:
                    setStreams((prev) => {
                        return prev.filter((s) => {
                            return s.id !== message.id
                        })
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
            <SocketContext.Provider value={ws}>
                <Stack streams={streams} />
            </SocketContext.Provider>
        </VStack>
    )
}
