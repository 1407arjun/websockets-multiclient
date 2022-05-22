import got from "got"
import type Joke from "../types/joke"

export default async (): Promise<string> => {
    try {
        const response: Joke = await got
            .get("https://icanhazdadjoke.com/", {
                headers: {
                    Accept: "application/json"
                }
            })
            .json()
        return response.joke
    } catch (e) {
        console.log(e)
        return ""
    }
}
