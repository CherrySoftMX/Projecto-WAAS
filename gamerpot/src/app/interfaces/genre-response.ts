export interface GenreResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<{
        
            id: number,
            name: string,
            image_background: string
        }>
}
