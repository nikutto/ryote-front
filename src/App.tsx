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

type TransportationProps = {
  name: String,
}
const Transportation: React.FC<TransportationProps> = props => {
  return (
    <div className="tra">
      ↓ {props.name}
    </div>
  );
}


type ItineraryOfDayProps = {
  day: number,
  landmarks: Landmark[],
  transportations: String[],
}

const ItineraryOfDay: React.FC <ItineraryOfDayProps> = props => {
    let landmarks = props.landmarks
    let transportations = props.transportations

    let cards = []
    let n = landmarks.length
    for (var i = 0;i+1 < n; i++) {
      cards.push(<LandmarkCard landmark={landmarks[i]}/>)
      cards.push(<Transportation name={transportations[i]}/>)
    }
    cards.push(<LandmarkCard landmark={landmarks[n-1]}/>)

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
class Main extends React.Component<{}, {}> {
  
  getLandmarksOf(day: number): Landmark[] { 
    return [
      {id: 100 * day + 0, name: "Kyoto Station", detail: "Kyoto is beautiful."},
      {id: 100 * day + 1, name: "Tokyo Station", detail: "Tokyo is wonderful."},
      {id: 100 * day + 2, name: "Jinbocho", detail: "Jinbocho has many book stores."},
    ];
  }
  getTransportationsOf(day: number): String[] {
    return ["Shikansen", "Yamanote"]
  }

  render() {
    const nDays = 2
    let cards: JSX.Element[] = []
    for (let i = 1;i <= nDays;i++){
      let landmarks = this.getLandmarksOf(i)
      let transportations: String[] = this.getTransportationsOf(i)
      let card = (
        <ItineraryOfDay 
            day={i} 
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
