import React from 'react'
import Loading from './Loading'
import Landmark from './Landmark'
import Transportation from './Transportation'
import Itinerary from './Itinerary'
import ServerUtil from './ServerUtil'
import Error from './Error'

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

    render() {
        console.log("render()" + this.state)        
        switch (this.state.loadStatus) {
            case "COMPLETE": return (<Itinerary 
                                        nDays={this.nDays}
                                        landmarks={this.state.landmarks}
                                        transportations={this.state.transportations}/>)
            case "LOADING": return (<Loading/>)
            default: return (<Error msg={this.state.loadStatus as string}/>)
        }
    }
}

export default Main