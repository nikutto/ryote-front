import React from 'react'
import Landmark from './Landmark'
import Transportation from './Transportation'
import ItineraryOfDay from './ItineraryOfDay'

type MainState = {
    loaded: boolean,
    landmarks: Landmark[][],
    transportations: Transportation[][]
}

class Main extends React.Component<{}, MainState> {
    nDays = 3

    async getLandmarksOf(day: number) {
        const response = await fetch('http://localhost:8080/landmark?day=' + day)
        const json: any[] = await response.json()
        const landmarks: Landmark[] = json.map(e => {
            let ret: Landmark = { id: e['id'], name: e['name'], detail: e['detail'] }
            return ret
        })
        return landmarks
    }
    async getTransportationsOf(day: number) {
        const response = await fetch('http://localhost:8080/transportation?day=' + day)
        const json: any[] = await response.json()
        const transportations: Transportation[] = json.map(e => {
            let ret: Transportation = { name: e['name'] }
            return ret
        })
        return transportations
    }

    constructor(props: {}) {
        super(props)
        this.state = {
            loaded: false,
            landmarks: [],
            transportations: [],
        }
    }
    componentDidMount() {
        let landmarksPromise: Promise<Landmark[]>[] = []
        let transportationsPromise: Promise<Transportation[]>[] = []
        for (let i = 0; i < this.nDays; i++) {
            landmarksPromise.push(this.getLandmarksOf(i))
            transportationsPromise.push(this.getTransportationsOf(i))
        }
        Promise.all(landmarksPromise).then(
            (landmarks) =>
                Promise.all(transportationsPromise).then(
                    (transportations) =>
                        this.setState({
                            loaded: true,
                            landmarks: landmarks,
                            transportations: transportations,
                        })
                )
        )
    }
    render() {
        let cards: JSX.Element[] = []
        if (!this.state.loaded) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        for (let i = 0; i < this.nDays; i++) {
            let landmarks: Landmark[] = this.state.landmarks[i]
            let transportations: Transportation[] = this.state.transportations[i]
            let card = (
                <ItineraryOfDay
                    day={i + 1}
                    landmarks={landmarks}
                    transportations={transportations} />
            )
            cards.push(card)
        }

        return (
            <div className="main">
                <main>
                    {cards}
                </main>
            </div>
        );
    }
}

export default Main