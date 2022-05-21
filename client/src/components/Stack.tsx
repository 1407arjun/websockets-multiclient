import { VStack } from "@chakra-ui/react"
import StackItem from "./StackItem"

export default function Stack() {
    return (
        <VStack w="100%" spacing={8} p={{ base: 4, xl: 8 }}>
            <StackItem />
            <StackItem />
        </VStack>
    )
}
