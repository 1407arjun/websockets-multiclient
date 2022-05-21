import logo from "./logo.svg"
import "./App.css"
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

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default App
