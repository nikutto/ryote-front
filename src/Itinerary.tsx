import React from 'react'
import ItineraryOfDay from './ItineraryOfDay'
import Site from './Site'

type ItineraryProps = {
    nDays: number,
    sites: Site[][]
}
const Itinerary: React.FC<ItineraryProps> = (props) => {
    let cards: JSX.Element[] = props.sites
        .map((sites, i) => (
                <ItineraryOfDay
                    day={i + 1}
                    sites={sites} />
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