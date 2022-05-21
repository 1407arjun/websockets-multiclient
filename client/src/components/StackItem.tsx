import {
    Stack,
    Button,
    Textarea,
    InputGroup,
    InputLeftAddon,
    ButtonGroup
} from "@chakra-ui/react"
import type Stream from "../types/stream"

export default function StackItem(props: Stream) {
    return (
        <Stack
            w={{ base: "100%", xl: "90%" }}
            spacing={4}
            justify="center"
            direction={{ base: "column", xl: "row" }}>
            <InputGroup>
                <InputLeftAddon
                    children={`Stream ${props.id}`}
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
                <Button colorScheme="yellow">Subscribe</Button>
                <Button colorScheme="red">Unubscribe</Button>
            </ButtonGroup>
        </Stack>
    )
}
