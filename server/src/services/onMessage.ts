import Message, { MessageType } from "../../../client/src/types/message"
import Connection from "../types/connection"

export default (data: Buffer, conn: Connection) => {
    let message: Message = JSON.parse(data.toString())

    switch (message.type) {
        case MessageType.SUBSCRIBE:
            connections.every((c) => {
                if (c.uuid === conn.uuid) {
                    c.streams.push(message.id)
                    return false
                }
                return true
            })
            break
        case MessageType.UNSUBSCRIBE:
            connections.every((c) => {
                if (c.uuid === conn.uuid) {
                    c.streams = c.streams.filter((s) => {
                        return s !== message.id
                    })
                    return false
                }
                return true
            })
            break
        default:
            break
    }

    connections.forEach((c) => {
        console.log(c.streams)
    })
}
