import Message, { MessageType } from "../../../client/src/types/message"
import Connection from "../types/connection"

export default (conn: Connection) => {
    connections = connections.filter((c) => {
        return c.uuid !== conn.uuid
    })
    streams = streams.filter((s) => {
        return s.id !== conn.uuid
    })

    console.log(connections.length)
    connections.forEach((c) => console.log(c.uuid))

    let message: Message = {
        type: MessageType.REMOVE,
        id: conn.uuid
    }
    conn.send(JSON.stringify(message))
}
