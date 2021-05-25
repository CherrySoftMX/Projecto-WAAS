import { GamePlatform } from "./game-platform";

export interface PlatformResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<GamePlatform>
}
