export type SiteType = "LANDMARK" | "TRANSPORTATION"

type Site = {
    id: number,
    siteType: SiteType,
    day: number,
    ord: number,
    name: string,
    detail: string,
    startTime: Date | null,
    endTime: Date | null
}

export default Site
