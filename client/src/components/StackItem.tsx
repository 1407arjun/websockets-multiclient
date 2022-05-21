import {
    Stack,
    Button,
    Textarea,
    InputGroup,
    InputLeftAddon,
    ButtonGroup
} from "@chakra-ui/react"

export default function StackItem() {
    return (
        <Stack
            w={{ base: "100%", xl: "90%" }}
            spacing={4}
            justify="center"
            direction={{ base: "column", xl: "row" }}>
            <InputGroup>
                <InputLeftAddon
                    children="Stream"
                    color="gray.900"
                    h="100%"
                    fontWeight="semibold"
                />
                <Textarea
                    variant="outline"
                    placeholder="Basic usage"
                    isReadOnly={true}
                    value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                    resize="vertical"
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
