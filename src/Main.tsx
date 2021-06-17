import React from 'react'
import Loading from './Loading'
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

function emptyIteneraryState(loadStatus: LoadStatus) {
    return {
        loadStatus: loadStatus,
        landmarks: [],
        transportations: [],
    }
}

class Main extends React.Component<{}, MainState> {
    nDays = 3

    
    constructor(props: {}) {
        super(props)
        this.state = emptyIteneraryState("LOADING")
    }

    isValidItinerary(landmarks: Landmark[][], transportations: Transportation[][]): boolean {
        for (let i = 0; i < this.nDays; i++) {
            if (Math.max(landmarks[i].length - 1, 0) !== transportations[i].length) {
                return false
            }
        }
        return true
    }

    componentDidMount() {
        let landmarksPromise = Array
            .from(Array(this.nDays).keys())
            .map(i => ServerUtil.getLandmarksOf(i))
        let transportationsPromise = Array
            .from(Array(this.nDays).keys())
            .map(i => ServerUtil.getTransportationsOf(i))        

        Promise.all([Promise.all(landmarksPromise), Promise.all(transportationsPromise)]).then(
            ([landmarks, transportations]) => {
                if (this.isValidItinerary(landmarks, transportations)) {
                    this.setState({
                        loadStatus: "COMPLETE",
                        landmarks: landmarks,
                        transportations: transportations,
                    })
                }
                else {
                    this.setState(emptyIteneraryState("ERROR_DB_STATUS"))
                }
            }

        ).catch(
            (error) => this.setState(emptyIteneraryState("ERROR_SERVER_CONNECTION"))
        )
    }
    renderLoading() {
        return (
            <div className="loading">Loading...</div>
        )
    }
    renderComplete(): JSX.Element {
        let cards: JSX.Element[] = Array
            .from(Array(this.nDays).keys())
            .map(i => (
                    <ItineraryOfDay
                        day={i + 1}
                        landmarks={this.state.landmarks[i]}
                        transportations={this.state.transportations[i]} />
                )
            )
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
                An error has been detected. <br />
                Error Type := {error}
            </div>
        )
    }
    render() {
        console.log("render()" + this.state)        
        switch (this.state.loadStatus) {
            case "LOADING": return (<Loading/>)
            case "COMPLETE": return this.renderComplete()
            default: return this.renderError(this.state.loadStatus)
        }
    }
}

export default Main