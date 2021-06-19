import React from 'react'
import Site from './Site'

type SiteCardProps = {
    site: Site
}
const LandmarkCard: React.FC<SiteCardProps> = props => {
    let site = props.site
    let namePrefix = site.siteType === "TRANSPORTATION" ? "↓ " : ""
    return (
        <div className="card">
            <div className="card-header" id={"heading_" + site.id}>
                <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse_" + site.id} aria-expanded="true" aria-controls={"collapse_" + site.id}>
                        {namePrefix + site.name}
                    </button>
                </h5>
            </div>
            <div id={"collapse_" + site.id} className="collapse" aria-labelledby={"heading_" + site.id} data-parent="#accordion">
                <div className="card-body">
                    {site.detail}
                </div>
            </div>
        </div>
    );
}

export default LandmarkCard