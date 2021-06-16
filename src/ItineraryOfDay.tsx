import React from 'react'
import Landmark from './Landmark'
import Transportation from './Transportation'
import LandmarkCard from './LandmarkCard'
import TransportationCard from './TransportationCard'

type ItineraryOfDayProps = {
    day: number,
    landmarks: Landmark[],
    transportations: Transportation[],
}

const ItineraryOfDay: React.FC<ItineraryOfDayProps> = props => {
    let landmarks = props.landmarks
    let transportations = props.transportations

    let cards = []
    if (landmarks.length > 0) {
        let n = landmarks.length
        for (var i = 0; i + 1 < n; i++) {
            cards.push(<LandmarkCard landmark={landmarks[i]} />)
            cards.push(<TransportationCard name={transportations[i].name} />)
        }
        cards.push(<LandmarkCard landmark={landmarks[n - 1]} />)
    } else {
        cards.push(<div className="Not loaded"> No schedule. </div>)
    }

    return (
        <div className={"itinerary_for_day_" + props.day}>
            <h2>
                Day {props.day}
            </h2>
            <div id="accordion">
                {cards}
            </div>
        </div>
    );
}


export default ItineraryOfDay
