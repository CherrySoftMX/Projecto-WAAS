import { Component, OnInit } from '@angular/core';
import { GameDetails } from 'src/app/interfaces/game-details';
import { GamePlatform } from 'src/app/interfaces/game-platform';
import { BestGamesService } from 'src/app/services/best-games.service';
import { GenreGamesService } from 'src/app/services/genres-games.service';
import { PlatformsGamesService } from 'src/app/services/platforms-games.service';

@Component({
  selector: 'app-best-games-page',
  templateUrl: './best-games-page.component.html',
  styleUrls: ['./best-games-page.component.css'],
})
export class BestGamesPageComponent implements OnInit {
  bestGames: Array<GameDetails> = [];
  platforms: Array<GamePlatform> = [];
  platformsNames: Array<string> = [];
  genres: Array<string> = [];
  currentPage: number = 1;
  totalPages: number = 0;
  fetchingGames: boolean = true;

  genre: string = '';
  platformId: number = -1;

  constructor(
    private bestGameService: BestGamesService,
    private platformService: PlatformsGamesService,
    private genreService: GenreGamesService
  ) {}

  ngOnInit(): void {
    this.getGameResponse(this.currentPage);
    this.getPlatforms();
    this.getGenres();
  }

  getGameResponse = async (page: number) => {
    this.fetchingGames = true;

    const response = await this.bestGameService.getBestGames(
      80,
      100,
      12,
      this.currentPage
    );
    const { results, count } = response;

    this.bestGames = results;
    this.totalPages = count;
    this.fetchingGames = false;
  };

  getPlatforms = async () => {
    const response = await this.platformService.getPlatforms();
    this.platforms = response.results;
    this.platformsNames = this.platforms.map((p) => p.name);
  };

  getGenres = async () => {
    const response = await this.genreService.getGenres();
    this.genres = response.results.map((p) => p.name);
  };

  loadGamesPage(page: number): void {
    this.currentPage = page;
    this.getGameResponse(this.currentPage);
  }

  filterByPlatform(platform: string): void {
      console.log(platform);
   if(platform == 'clear'){
       this.platformId = -1;
       return;
   }
        const p = this.platforms.filter((p) => p.name == platform)[0];
    this.platformId = p.id;
   

   if(this.genre == 'clear'){
        this.bestGameService
      .getBestGamesByPlataform(80, 100, 12, this.currentPage, this.platformId)
      .then((response) => {
        const { results, count } = response;
        this.bestGames = results;
        this.totalPages = count;
      });
   }else{

    this.filterByGenreAndPlatform(this.genre, this.platformId);
   }
  }

  filterByGenre(genre: string): void {
    this.genre = genre;
    if(this.genre == 'clear')
    return;

    if(this.platformId == -1){
   this.bestGameService
      .getBestGamesByGenre(80, 100, 12, this.currentPage, this.genre.toLowerCase())
      .then((response) => {
        const { results, count } = response;
        this.bestGames = results;
        this.totalPages = count;
      });
    }else{
        this.filterByGenreAndPlatform(this.genre, this.platformId);
    }
 
  }

  filterByGenreAndPlatform(genre:string, platform:number):void{
      this.bestGameService
      .getBestGamesByGenreAndPlatform(80, 100, 12, this.currentPage, genre.toLowerCase(), platform)
      .then((response) => {
        const { results, count } = response;
        this.bestGames = results;
        this.totalPages = count;
      });
  }
}
