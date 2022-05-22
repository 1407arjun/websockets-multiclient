import axios from "axios"
import type Joke from "../types/joke"

export default async (): Promise<string> => {
    try {
        const response = await axios.get("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        })
        const joke: Joke = response.data
        return joke.joke
    } catch (e) {
        console.log(e)
        return ""
    }
}
