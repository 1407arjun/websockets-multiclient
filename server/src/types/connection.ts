import { WebSocket } from "ws"

type Connection = WebSocket & {
    uuid: string
}

export default Connection
