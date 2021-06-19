import React from 'react'
import Loading from './Loading'
import Site from './Site'
import Itinerary from './Itinerary'
import ServerUtil from './ServerUtil'
import Error from './Error'

type LoadStatus = "LOADING" | "COMPLETE" | "ERROR_DB_STATUS" | "ERROR_SERVER_CONNECTION"
type MainState = {
    loadStatus: LoadStatus,
    sites: Site[][]
}

class Main extends React.Component<{}, MainState> {
    nDays = 3

    constructor(props: {}) {
        super(props)
        this.state = {
            loadStatus: "LOADING",
            sites: []   
        }
    }

    componentDidMount() {
        let sitesPromise = Array
            .from(Array(this.nDays).keys())
            .map(i => ServerUtil.getSitesOf(i))

        Promise.all(sitesPromise).then(
            (sites) => this.setState({
                loadStatus: "COMPLETE",
                sites: sites
            })
        ).catch(
            (error) => this.setState({
                loadStatus: "ERROR_SERVER_CONNECTION",
                sites: []
            })
        )
    }
    renderLoading() {
        return (
            <div className="loading">Loading...</div>
        )
    }

    renderBody() {
        switch (this.state.loadStatus) {
            case "COMPLETE": return (<Itinerary 
                                        nDays={this.nDays}
                                        sites={this.state.sites}/>)
            case "LOADING": return (<Loading/>)
            default: return (<Error msg={this.state.loadStatus as string}/>)
        }
    }
    render() {
        let body = this.renderBody()
        return (
            <div className="main" style={{margin: "20px"}}>
                {body}
            </div>
        )
    }
}

export default Main