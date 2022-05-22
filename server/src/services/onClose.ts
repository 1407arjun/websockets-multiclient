import Message, { MessageType } from "../../../client/src/types/message"
import Connection from "../types/connection"

export default (conn: Connection) => {
    connections = connections.filter((c) => c.uuid !== conn.uuid)
    streams = streams.filter((s) => s.id !== conn.uuid)

    let message: Message = {
        type: MessageType.REMOVE,
        id: conn.uuid
    }
    conn.send(JSON.stringify(message))
}
