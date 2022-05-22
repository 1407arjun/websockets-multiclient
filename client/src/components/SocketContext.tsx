import { createContext } from "react"

//@ts-ignore
const SocketContext = createContext<WebSocket>()

export default SocketContext
