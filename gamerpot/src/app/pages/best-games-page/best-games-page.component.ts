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
  readonly CLEAR_FIELD: any = null;

  bestGames: Array<GameDetails> = [];

  currentPage: number = 1;
  collectionSize: number = 0;
  fetchingGames: boolean = true;

  platforms: Array<GamePlatform> = [];
  currentPlatform: GamePlatform = {} as GamePlatform;

  genres: Array<Genre> = [];
  currentGenre: Genre = {} as Genre;

  constructor(
    private bestGameService: BestGamesService,
    private platformService: PlatformsGamesService,
    private genreService: GenreGamesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPathParameters();
    this.fetchGenres();
    this.fetchPlatforms();
  }

  navigate() {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        page: this.currentPage,
        platform: this.currentPlatform.id,
        genre: this.currentGenre.id,
      },
    });
  }

  getPathParameters() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.currentGenre.id = params['genre'] || this.CLEAR_FIELD;
      this.currentPlatform.id = params['platform'] || this.CLEAR_FIELD;
      this.refreshGames();
    });
  }

  refreshGames = async () => {
    this.fetchingGames = true;

    const response = await this.bestGameService
      .buildUrl({
        page: this.currentPage,
        platform: this.currentPlatform.id,
        genre: this.currentGenre.id,
      })
      .fetchGames();

    if (response) {
      const { results, count } = response;
      this.bestGames = results;
      this.collectionSize = count;
    }

    this.fetchingGames = false;
  };

  fetchPlatforms = async () => {
    const response = await this.platformService.getPlatforms();
    this.platforms = response.results;
    this.setCurrentPlatform();
  };

  setCurrentPlatform = () => {
    const currentPlatform = this.platforms.find(
      (plat) => plat.id == this.currentPlatform.id
    );

    if (currentPlatform) this.currentPlatform = currentPlatform;
  };

  fetchGenres = async () => {
    const response = await this.genreService.getGenres();
    this.genres = response.results;
    this.setCurrentGenre();
  };

  setCurrentGenre = () => {
    const currentGenre = this.genres.find(
      (gen) => gen.id == this.currentGenre.id
    );

    if (currentGenre) this.currentGenre = currentGenre;
  };

  filterByPlatform = (selectedPlatform: string) => {
    this.currentPage = 1;
    const platform = this.platforms.find((p) => p.name === selectedPlatform);
    this.currentPlatform.id = platform?.id || this.CLEAR_FIELD;
    this.navigate();
  };

  filterByGenre = (selectedGenre: string) => {
    this.currentPage = 1;
    const genre = this.genres.find((g) => g.name === selectedGenre);
    this.currentGenre.id = genre?.id || this.CLEAR_FIELD;
    this.navigate();
  };

  changePage = (page: number): void => {
    this.currentPage = page;
  };
}
