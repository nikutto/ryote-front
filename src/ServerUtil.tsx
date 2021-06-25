import Site from './Site'

module ServerUtil {

    export async function loginApi() {
        let body = new FormData()
        body.set("username", "user")
        body.set("password", "password")
        await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: body,
            credentials: "include",
        })
    }
    async function getApi(path: String) {
        return fetch('http://localhost:8080/' + path, {
            credentials: "include",
        })
    }
    
    export async function getSitesOf(day: number) {
        const response = await getApi('site?day=' + day)
        const sites: Site[] = await response.json()
        return sites
    }
}

export default ServerUtil