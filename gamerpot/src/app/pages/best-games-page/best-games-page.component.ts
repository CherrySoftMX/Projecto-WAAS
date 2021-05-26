import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  platformCurrent: string = '';

  genres: Array<Genre> = [];
  genresNames: Array<string> = [];
  genreCurrent: string = '';

  currentPage: number = 1;
  totalPages: number = 0;
  fetchingGames: boolean = true;

  readonly CLEAR_FIELD: number = -1;
  genreId: number = this.CLEAR_FIELD;
  platformId: number = this.CLEAR_FIELD;

  constructor(
    private bestGameService: BestGamesService,
    private platformService: PlatformsGamesService,
    private genreService: GenreGamesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataRoute();
    this.getPlatforms();
    this.getGenres();
  }

  getDataRoute() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] ? params['page'] : 1;
      this.genreId = params['genre'] ? params['genre'] : this.CLEAR_FIELD;
      this.platformId = params['platform']
        ? params['platform']
        : this.CLEAR_FIELD;
      this.getBestGames();
    });
  }

  navigate() {
    this.router.navigate(['best-games'], {
      queryParams: {
        page: this.currentPage,
        platform: this.platformId,
        genre: this.genreId,
      },
    });
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
    const p = this.platforms.filter((plat) => plat.id == this.platformId)[0];
    if (p) {
      this.platformCurrent = p.name;
      const i = this.platformsNames.indexOf(this.platformCurrent);
      this.platformsNames.splice(i, 1);
    }
  };

  getGenres = async () => {
    const response = await this.genreService.getGenres();
    this.genres = response.results;
    this.genresNames = response.results.map((g) => g.name);
    const g = this.genres.filter((gen) => gen.id == this.genreId)[0];
    if (g) {
      this.genreCurrent = g.name;
      const i = this.genresNames.indexOf(this.genreCurrent);
      this.genresNames.splice(i, 1);
    }
  };

  loadGamesPage = (page: number): void => {
    this.currentPage = page;
    this.navigate();
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
    } else {
      this.platformId = p.id;
    }
    this.navigate();
  };

  filterByGenre = (genre: string): void => {
    this.currentPage = 1;
    const g = this.genres.filter((g) => g.name == genre)[0];
    if (g == null) {
      this.genreId = this.CLEAR_FIELD;
    } else {
      this.genreId = g.id;
    }
    this.navigate();
  };
}
