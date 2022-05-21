import "./styles/App.css"
import { useEffect } from "react"

function App() {
    useEffect(() => {
        let ws = new WebSocket("ws://localhost:5000")

        ws.onopen = () => {
            console.log("WebSocket Client Connected")
            ws.send("Hello")
        }
        ws.onmessage = (ev) => {
            console.log(ev.data)
        }
    })

    return <div className="App"></div>
}

export default App
