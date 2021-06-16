import React from 'react'
import Landmark from './Landmark'

type LandmarkCardProps = {
    landmark: Landmark
}
const LandmarkCard: React.FC<LandmarkCardProps> = props => {
    let landmark = props.landmark
    return (
        <div className="card">
            <div className="card-header" id={"heading_" + landmark.id}>
                <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse_" + landmark.id} aria-expanded="true" aria-controls={"collapse_" + landmark.id}>
                        {landmark.name}
                    </button>
                </h5>
            </div>
            <div id={"collapse_" + landmark.id} className="collapse" aria-labelledby={"heading_" + landmark.id} data-parent="#accordion">
                <div className="card-body">
                    {landmark.detail}
                </div>
            </div>
        </div>
    );
}

export default LandmarkCard