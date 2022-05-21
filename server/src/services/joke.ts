import axios from "axios"

type Joke = {
    id: string
    joke: string
    status: number
}

export default async (): Promise<string | undefined> => {
    const joke: Joke = (await axios.get("https://icanhazdadjoke.com/")).data
    return joke.joke
}
