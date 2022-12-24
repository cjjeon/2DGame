import cookie from "../cookie";

interface User {
    id: string
    username: string
}


export default async (): Promise<User> => {
    const response = await fetch('http://localhost:4001/create-user-without-signup', {
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
        throw Error()
    }

    return response.json()
}