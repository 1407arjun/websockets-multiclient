import {
    Stack,
    Button,
    Textarea,
    InputGroup,
    InputLeftAddon,
    ButtonGroup
} from "@chakra-ui/react"
import { useContext } from "react"
import Message, { MessageType } from "../types/message"
import type Stream from "../types/stream"
import SocketContext from "./SocketContext"

export default function StackItem(props: Stream & { i: string }) {
    const conn = useContext(SocketContext)

    function subscribe() {
        let message: Message = {
            type: MessageType.SUBSCRIBE,
            id: props.id
        }
        conn.send(JSON.stringify(message))
    }

    function unsubscribe() {
        let message: Message = {
            type: MessageType.UNSUBSCRIBE,
            id: props.id
        }
        conn.send(JSON.stringify(message))
    }

    return (
        <Stack
            w={{ base: "100%", xl: "90%" }}
            spacing={4}
            justify="center"
            direction={{ base: "column", xl: "row" }}>
            <InputGroup>
                <InputLeftAddon
                    children={`Stream ${props.i}`}
                    color="gray.900"
                    h="100%"
                    fontWeight="semibold"
                />
                <Textarea
                    variant="outline"
                    placeholder="Jokes from this stream would show up if you subscribe"
                    isReadOnly={true}
                    value={props.value}
                    resize="vertical"
                    roundedBottomLeft={0}
                    roundedBottomRight={0}
                />
            </InputGroup>
            <ButtonGroup
                variant="solid"
                spacing={2}
                justifyContent="center"
                alignItems="center">
                <Button colorScheme="yellow" onClick={subscribe}>
                    Subscribe
                </Button>
                <Button colorScheme="red" onClick={unsubscribe}>
                    Unubscribe
                </Button>
            </ButtonGroup>
        </Stack>
    )
}
