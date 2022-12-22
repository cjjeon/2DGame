import cookie from "../cookie";

export default async (): Promise<null> => {
    const response = await fetch('http://localhost:4001/create-user-without-signup', {
        method: 'POST',
        credentials: 'same-origin',
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

    return null
}