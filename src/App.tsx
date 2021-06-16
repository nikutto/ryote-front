import React from 'react';

type Landmark = {
  id: number,
  name: String,
  detail: String,
}
type LandmarkCardProps = {
  landmark: Landmark
}
const LandmarkCard: React.FC <LandmarkCardProps> = props => {
  let landmark = props.landmark
  return (
    <div className="card">
      <div className="card-header" id={"heading_"+landmark.id}>
        <h5 className="mb-0">
          <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse_"+landmark.id} aria-expanded="true" aria-controls={"collapse_"+landmark.id}>
            {landmark.name}
          </button>
        </h5>
      </div>
      <div id={"collapse_"+landmark.id} className="collapse" aria-labelledby={"heading_"+landmark.id} data-parent="#accordion">
        <div className="card-body">
          {landmark.detail}
        </div>
      </div>
    </div>
  );
}

type Transportation = {
  name: String,
}
const TransportationCard: React.FC<Transportation> = props => {
  return (
    <div className="tra">
      ↓ {props.name}
    </div>
  );
}


type ItineraryOfDayProps = {
  day: number,
  landmarks: Landmark[],
  transportations: Transportation[],
}

const ItineraryOfDay: React.FC <ItineraryOfDayProps> = props => {
    let landmarks = props.landmarks
    let transportations = props.transportations
    
    let cards = []
    if (landmarks.length > 0) {
      let n = landmarks.length
      for (var i = 0;i+1 < n; i++) {
        cards.push(<LandmarkCard landmark={landmarks[i]}/>)
        cards.push(<TransportationCard name={transportations[i].name}/>)
      }
      cards.push(<LandmarkCard landmark={landmarks[n-1]}/>)
    }
    
    return (
      <div className={"itinerary_for_day_"+props.day}>
        <h2>
          Day {props.day}
        </h2>
        <div id="accordion">
          {cards}
        </div>
      </div>
    );
}

const Header: React.FC = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#"> Ryote </a>                 
        </div>
      </nav>
    </div>
  );
}

type MainState = {
  loaded: boolean,
  landmarks: Landmark[][],
  transportations: Transportation[][]
}

class Main extends React.Component<{}, MainState> {
  nDays = 3

  async getLandmarksOf(day: number) { 
    const response = await fetch('http://localhost:8080/landmark?day='+day)
    const json: any[] = await response.json()
    const landmarks: Landmark[] = json.map(e => {
      let ret: Landmark = {id: e['id'], name: e['name'], detail: e['detail']}
      return ret
    })
    return landmarks
  }
  async getTransportationsOf(day: number) { 
    const response = await fetch('http://localhost:8080/transportation?day='+day)
    const json: any[] = await response.json()
    const transportations: Transportation[] = json.map(e => {
      let ret: Transportation = {name: e['name']}
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

    for (let i = 0;i < this.nDays;i++){
      let landmarks: Landmark[] = this.state.landmarks[i]
      let transportations: Transportation[] = this.state.transportations[i]
      let card = (
        <ItineraryOfDay 
            day={i+1} 
            landmarks={landmarks}
            transportations={transportations}/>
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
const App: React.FC = () => {
  return (
    <div className="app">
      <Header/>        
      <Main/>
    </div>
  );
}

export default App;
