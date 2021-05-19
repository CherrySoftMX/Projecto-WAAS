export interface GameDetails {

    id: number,
    slug: string,
    name: string,
    playtime: number,
    name_original: string,
    description: string,
    description_raw: string,
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
    >,
    developers: Array<
        {
            id: number,
            name: string,
            slug: string
        }
    >,
    genres: Array<
        {
            id: number,
            name: string,
            slug: string

        }
    >,
    publishers: Array<
        {
            id: number,
            name: string,
            slug: string
        }
    >


}
