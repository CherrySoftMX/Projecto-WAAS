import { Component, OnInit } from '@angular/core';
import { GameDetails } from 'src/app/interfaces/game-details';
import { Genre } from 'src/app/interfaces/genre-response';
import { GamePlatform } from 'src/app/interfaces/platform-response';
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

  genres: Array<Genre> = [];
  genresNames: Array<string> = [];

  currentPage: number = 1;
  totalPages: number = 0;
  fetchingGames: boolean = true;

  readonly CLEAR_FIELD: number = -1;
  genreId: number = this.CLEAR_FIELD;
  platformId: number = this.CLEAR_FIELD;

  constructor(
    private bestGameService: BestGamesService,
    private platformService: PlatformsGamesService,
    private genreService: GenreGamesService
  ) {}

  ngOnInit(): void {
    this.getGameResponse();
    this.getPlatforms();
    this.getGenres();
  }

  getGameResponse = async () => {
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
    this.genres = response.results;
    this.genresNames = response.results.map((g) => g.name);
  };

  loadGamesPage = (page: number): void => {
    this.currentPage = page;
    this.getBestGames();
  };

  getBestGamesByPlatform = async () => {
    this.fetchingGames = true;
    const response = await this.bestGameService.getBestGamesByPlataform(
      80,
      100,
      12,
      this.currentPage,
      this.platformId
    );
    const { results, count } = response;
    this.bestGames = results;
    this.totalPages = count;
    this.fetchingGames = false;
  };

  getBestGamesByGenre = async () => {
    this.fetchingGames = true;
    const response = await this.bestGameService.getBestGamesByGenre(
      80,
      100,
      12,
      this.currentPage,
      this.genreId
    );

    const { results, count } = response;
    this.bestGames = results;
    this.totalPages = count;
    this.fetchingGames = false;
  };

  getBestGamesByGenreAndPlatform = async () => {
    this.fetchingGames = true;
    const response = await this.bestGameService.getBestGamesByGenreAndPlatform(
      80,
      100,
      12,
      this.currentPage,
      this.genreId,
      this.platformId
    );
    const { results, count } = response;
    this.bestGames = results;
    this.totalPages = count;
    this.fetchingGames = false;
  };

  getBestGames = () => {
    if (this.genreId == this.CLEAR_FIELD && this.platformId == this.CLEAR_FIELD)
      this.getGameResponse();

    if (this.genreId == this.CLEAR_FIELD && this.platformId != this.CLEAR_FIELD)
      this.getBestGamesByPlatform();

    if (this.genreId != this.CLEAR_FIELD && this.platformId == this.CLEAR_FIELD)
      this.getBestGamesByGenre();

    if (this.genreId != this.CLEAR_FIELD && this.platformId != this.CLEAR_FIELD)
      this.getBestGamesByGenreAndPlatform();
  };

  filterByPlatform = (platform: string): void => {
    this.currentPage = 1;
    const p = this.platforms.filter((p) => p.name == platform)[0];
    if (p == null) {
      this.platformId = this.CLEAR_FIELD;
      this.getBestGames();
      return;
    }
    this.platformId = p.id;
    this.getBestGames();
  };

  filterByGenre = (genre: string): void => {
    this.currentPage = 1;
    const g = this.genres.filter((g) => g.name == genre)[0];
    if (g == null) {
      this.genreId = this.CLEAR_FIELD;
      this.getBestGames();
      return;
    }
    this.genreId = g.id;
    this.getBestGames();
  };
}
