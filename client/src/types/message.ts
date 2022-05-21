export const enum MessageType {
    ADD,
    UPDATE,
    REMOVE
}

type Message = {
    type: MessageType
    id: string
    value?: string
}

export default Message
