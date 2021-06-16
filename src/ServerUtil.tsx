import Landmark from './Landmark'
import Transportation from './Transportation'

module ServerUtil {

    export async function getLandmarksOf(day: number) {
        const response = await fetch('http://localhost:8080/landmark?day=' + day)
        const json: any[] = await response.json()
        const landmarks: Landmark[] = json.map(e => {
            let ret: Landmark = { id: e['id'], name: e['name'], detail: e['detail'] }
            return ret
        })
        return landmarks
    }

    export async function getTransportationsOf(day: number) {
        const response = await fetch('http://localhost:8080/transportation?day=' + day)
        const json: any[] = await response.json()
        const transportations: Transportation[] = json.map(e => {
            let ret: Transportation = { name: e['name'] }
            return ret
        })
        return transportations
    }
}

export default ServerUtil