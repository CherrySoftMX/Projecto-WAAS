import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deal } from 'src/app/_models/deal';
import { GameDetails } from 'src/app/_models/game-details';
import { GamePlatform } from 'src/app/_models/platform-response';
import { BestGamesService } from 'src/app/_services/best-games.service';
import { PlatformsGamesService } from 'src/app/_services/platforms-games.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  readonly CLEAR_FIELD: any = null;
  readonly INVALID_FIELD: string = 'All';
  readonly MAX_COUNT: number = 2000;

  games: GameDetails[] = [];
  deals: Deal[] = [];

  platforms: GamePlatform[] = [];
  currentPlatform: GamePlatform = {} as GamePlatform;

  orders: string[] = [
    'released',
    'rating',
    'added',
    'created',
    'updated',
    'name',
    'metacritic',
  ];
  currentOrder: string = 'released';

  currentPage: number = 1;
  collectionSize: number = 0;

  currentSearch: string = this.CLEAR_FIELD;
  fetchingGames: boolean = true;

  constructor(
    private bestGameService: BestGamesService,
    private platformsService: PlatformsGamesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPathParams();
    this.fetchPlatforms();
    this.setCurrentOrder();
  }

  navigate() {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        page: this.currentPage,
        order: this.currentOrder,
        platform: this.currentPlatform.id,
        search: this.currentSearch,
      },
    });
  }

  getPathParams() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.currentPlatform.id = params['platform'] || this.CLEAR_FIELD;
      this.currentOrder = params['order'] || this.CLEAR_FIELD;
      this.currentSearch = params['search'] || this.CLEAR_FIELD;
      this.refreshGames();
    });
  }

  async refreshGames() {
    this.fetchingGames = true;

    const response = await this.bestGameService
      .buildUrl({
        page: this.currentPage,
        platforms: this.currentPlatform.id,
        ordering: '-' + this.currentOrder,
        search: this.currentSearch,
        metacritic: [0, 100],
        search_precise: true,
      })
      .fetchGames();

    if (response) {
      const { results, count } = response;
      this.games = results;
      this.collectionSize = Math.min(this.MAX_COUNT, count);
    }

    this.fetchingGames = false;
  }

  async fetchPlatforms() {
    const response = await this.platformsService.getPlatforms();

    if (response) {
      this.platforms = response.results;
      this.setCurrentPlatform();
    }
  }

  setCurrentPlatform() {
    const platform = this.platforms.find(
      (p) => p.id == this.currentPlatform.id
    );
    if (platform) this.currentPlatform = platform;
  }

  setCurrentOrder() {
    const order = this.orders.find((o) => o == this.currentOrder);
    if (order) this.currentOrder = order;
  }

  changePage(page: number) {
    this.currentPage = page;
    this.navigate();
  }

  filterByOrder(order: string) {
    this.currentPage = 1;
    this.currentOrder = order;
    if (this.currentOrder == this.INVALID_FIELD)
      this.currentOrder = this.CLEAR_FIELD;
    this.navigate();
  }

  filterByPlatform(platform: string) {
    this.currentPage = 1;
    let plat = this.platforms.find((p) => p.name == platform);
    this.currentPlatform.id = plat?.id || this.CLEAR_FIELD;
    this.navigate();
  }

  searchGame(name: string) {
    this.currentPage = 1;
    this.currentSearch = name;
    this.navigate();
  }
}
