import { VStack } from "@chakra-ui/react"
import StackItem from "./StackItem"
import type Stream from "../types/stream"

type Streams = {
    streams: Stream[]
}

export default function Stack(props: Streams) {
    return (
        <VStack w="100%" spacing={8} p={{ base: 4, xl: 8 }}>
            {props.streams.map((stream, index) => {
                return (
                    <StackItem
                        key={stream.id}
                        id={String(index + 1)}
                        value={stream.value}
                    />
                )
            })}
        </VStack>
    )
}
