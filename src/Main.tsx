import React from 'react'
import Landmark from './Landmark'
import Transportation from './Transportation'
import ItineraryOfDay from './ItineraryOfDay'
import ServerUtil from './ServerUtil'

type LoadStatus = "LOADING" | "COMPLETE" | "ERROR_DB_STATUS" | "ERROR_SERVER_CONNECTION"

type MainState = {
    loadStatus: LoadStatus,
    landmarks: Landmark[][],
    transportations: Transportation[][]
}

class Main extends React.Component<{}, MainState> {
    nDays = 3

    constructor(props: {}) {
        super(props)
        this.state = {
            loadStatus: "LOADING",
            landmarks: [],
            transportations: [],
        }
    }

    isValid(landmarks: Landmark[][], transportations: Transportation[][]): boolean {
        for (let i = 0; i < this.nDays; i++) {
            if (Math.max(landmarks[i].length - 1, 0) !== transportations[i].length) {
                return false
            }
        }
        return true
    }

    setConnectionErrorStatus() {
        this.setState({
            loadStatus: "ERROR_SERVER_CONNECTION",
            landmarks: [],
            transportations: [],
        })
    }
    componentDidMount() {
        let landmarksPromise: Promise<Landmark[]>[] = []
        let transportationsPromise: Promise<Transportation[]>[] = []
        for (let i = 0; i < this.nDays; i++) {
            landmarksPromise.push(ServerUtil.getLandmarksOf(i))
            transportationsPromise.push(ServerUtil.getTransportationsOf(i))
        }

        Promise.all(landmarksPromise).then(
            (landmarks) =>
                Promise.all(transportationsPromise).then(
                    (transportations) => {
                        if (this.isValid(landmarks, transportations)) {
                            this.setState({
                                loadStatus: "COMPLETE",
                                landmarks: landmarks,
                                transportations: transportations,
                            })
                        }
                        else {
                            this.setState({
                                loadStatus: "ERROR_DB_STATUS",
                                landmarks: [],
                                transportations: []
                            })
                        }
                    }
                ).catch(
                    (error) => this.setConnectionErrorStatus()
                )
        ).catch(
            (error) => this.setConnectionErrorStatus()
        )
    }
    renderLoading() {
        return (
            <div className="loading">Loading...</div>
        )
    }
    renderComplete(): JSX.Element {
        let cards: JSX.Element[] = []
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
    renderError(error: String) {
        return (
            <div className="error">
                An error has been detected. <br/>
                Error Type := {error}
            </div>
        )
    }
    render() {
        switch(this.state.loadStatus) {
            case "LOADING": return this.renderLoading()
            case "COMPLETE": return this.renderComplete()
            default: return this.renderError(this.state.loadStatus)
        }
    }
}

export default Main