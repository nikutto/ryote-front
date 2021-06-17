import React from 'react'
import ItineraryOfDay from './ItineraryOfDay'
import Landmark from './Landmark'
import Transportation from './Transportation'

type ItineraryProps = {
    nDays: number,
    landmarks: Landmark[][],
    transportations: Transportation[][]
}
const Itinerary: React.FC<ItineraryProps> = (props) => {
    let cards: JSX.Element[] = Array
        .from(Array(props.nDays).keys())
        .map(i => (
                <ItineraryOfDay
                    day={i + 1}
                    landmarks={props.landmarks[i]}
                    transportations={props.transportations[i]} />
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

export default Itinerary