import React from 'react'
import Site from './Site'

type SiteCardProps = {
    site: Site
}
const LandmarkCard: React.FC<SiteCardProps> = props => {
    let site = props.site
    let namePrefix = site.siteType === "TRANSPORTATION" ? "↓ " : ""
    return (
        <div className="card" style={{margin: "2px"}}>
            <span style={{cursor: "pointer"}}>
            <div className="card-header" id={"heading_" + site.id} data-toggle="collapse" data-target={"#collapse_" + site.id} aria-expanded="true" aria-controls={"collapse_" + site.id}>
                <h5 className="mb-0">
                    <div className="siteName">
                        {namePrefix + site.name}
                    </div>
                </h5>
            </div>
            </span>
            <div id={"collapse_" + site.id} className="collapse" aria-labelledby={"heading_" + site.id} data-parent="#accordion">
                <div className="card-body">
                    {site.detail}
                </div>
            </div>
        </div>
    );
}

export default LandmarkCard