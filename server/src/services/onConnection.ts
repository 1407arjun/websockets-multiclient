import { v4 as uuidv4 } from "uuid"
import type Connection from "../types/connection"
import type Stream from "../../../client/src/types/stream"
import Message, { MessageType } from "../../../client/src/types/message"
import onMessage from "./onMessage"
import onClose from "./onClose"

export default async (conn: Connection) => {
    conn.uuid = uuidv4()

    conn.on("message", (data: Buffer) => {
        onMessage(data, conn)
    })

    conn.on("close", () => {
        onClose(conn)
    })

    connections.push(conn)

    let joke: string = "Hello" //await getJoke()
    let stream: Stream = { id: conn.uuid, value: joke }
    streams.push(stream)

    console.log(connections.length)
    connections.forEach((c) => console.log(c.uuid))

    conn.send(
        JSON.stringify({ type: MessageType.INIT, id: conn.uuid, streams })
    )

    let message: Message = {
        type: MessageType.ADD,
        ...stream
    }
    connections.forEach((c) => {
        if (c.uuid !== conn.uuid) c.send(JSON.stringify(message))
    })
}
