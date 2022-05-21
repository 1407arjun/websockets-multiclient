import axios from "axios"

type Joke = {
    id: string
    joke: string
    status: number
}

export default async (): Promise<string | undefined> => {
    try {
        const response = await axios.get("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        })
        const joke: Joke = response.data
        return joke.joke
    } catch (e) {
        console.log(e)
        return undefined
    }
}
