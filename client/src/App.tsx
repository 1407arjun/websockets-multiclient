import { VStack, Heading, Divider } from "@chakra-ui/react"
import { useEffect } from "react"
import Stack from "./components/Stack"

export default function App() {
    useEffect(() => {
        let ws = new WebSocket("ws://localhost:5000")

        ws.onopen = () => {
            console.log("WebSocket Client Connected")
            ws.send("Hello")
        }
        ws.onmessage = (ev) => {
            console.log(ev.data)
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
            <Stack />
        </VStack>
    )
}
