import Stream from "./stream"

export const enum MessageType {
    INIT,
    ADD,
    UPDATE,
    REMOVE,
    SUBSCRIBE,
    UNSUBSCRIBE
}

type Message = {
    type: MessageType
    id: string
    value?: string
    streams?: Stream[]
}

export default Message
