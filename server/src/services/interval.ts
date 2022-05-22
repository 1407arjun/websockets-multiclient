import Message, { MessageType } from "../../../client/src/types/message"
import getJoke from "./getJoke"

export default () => {
    setInterval(async () => {
        for (const s of streams) {
            s.value = String(Math.random() * 100) //await getJoke()
        }

        for (const c of connections) {
            let message: Message = {
                type: MessageType.UPDATE,
                id: c.uuid,
                streams: streams.filter((s) => c.streams.includes(s.id))
            }
            if (message.streams!.length > 0) c.send(JSON.stringify(message))
        }
    }, 5000)
}
