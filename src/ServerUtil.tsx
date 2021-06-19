import Site from './Site'

module ServerUtil {

    async function fetchServer(path: String) {
        return fetch('http://localhost:8080/' + path)
    }
    
    export async function getSitesOf(day: number) {
        const response = await fetchServer('/site?day=' + day)
        const sites: Site[] = await response.json()
        return sites
    }
}

export default ServerUtil