import Landmark from './Landmark'
import Transportation from './Transportation'
import Site from './Site'

module ServerUtil {

    async function fetchServer(path: String) {
        return fetch('http://localhost:8080/' + path)
    }
    
    export async function getLandmarksOf(day: number) {
        const response = await fetchServer('landmark?day=' + day)
        const json: any[] = await response.json()
        const landmarks: Landmark[] = json.map(e => {
            let ret: Landmark = { id: e['id'], name: e['name'], detail: e['detail'] }
            return ret
        })
        return landmarks
    }

    export async function getTransportationsOf(day: number) {
        const response = await fetchServer('/transportation?day=' + day)
        const json: any[] = await response.json()
        const transportations: Transportation[] = json.map(e => {
            let ret: Transportation = { name: e['name'] }
            return ret
        })
        return transportations
    }

    export async function getSitesOf(day: number) {
        const response = await fetchServer('/site?day=' + day)
        const sites: Site[] = await response.json()
        return sites
    }
}

export default ServerUtil