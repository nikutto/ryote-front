import React from 'react'
import Site from './Site'
import SiteCard from './SiteCard'

type ItineraryOfDayProps = {
    day: number,
    sites: Site[]
}

const ItineraryOfDay: React.FC<ItineraryOfDayProps> = props => {
    let cards = props.sites.map(site =>
        <SiteCard site={site} />
    )

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
