export interface GameDetails {

    id: number,
    slug: string,
    name: string,
    name_original: string,
    description: string,
    metacritic: number,
    released: string,
    updated: string,
    background_image: string,
    background_image_additional: string,
    website: string,
    platforms: Array<
        {
            platform: {
                id: number,
                slug: string,
                name: string
            }
        }
    >

}
