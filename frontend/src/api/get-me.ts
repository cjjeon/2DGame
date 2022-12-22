import config from "../config"
import cookie from "../cookie";

interface User {
    id: string
    username: string
}

export default async (): Promise<User> => {
    const response = await fetch(`${config.SERVER_URL}/get-me`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'cookie': cookie.getFootprintCookie()
        })
    })

    if (response.status !== 200) {
        throw new Error()
    }

    return response.json()
}