import React from 'react'
import Transportation from './Transportation'

const TransportationCard: React.FC<Transportation> = props => {
    return (
        <div className="tra">
            ↓ {props.name}
        </div>
    );
}

export default TransportationCard