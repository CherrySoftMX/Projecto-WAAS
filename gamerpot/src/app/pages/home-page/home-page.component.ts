import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDetails } from 'src/app/interfaces/game-details';
import { IndividualDealInterface } from 'src/app/interfaces/individual-deal';
import { GamePlatform } from 'src/app/interfaces/platform-response';
import { DealsService } from 'src/app/services/deals-service.service';
import { GamesService } from 'src/app/services/games-service';
import { PlatformsGamesService } from 'src/app/services/platforms-games.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  readonly CLEAR_FIELD: any = null;
  readonly INVALID_FIELD: string = 'All';
  readonly MAX_COUNT: number = 2000;

  games: Array<GameDetails> = [];
  deals: Array<IndividualDealInterface> = [];

  platforms: Array<GamePlatform> = [];
  currentPlatform: GamePlatform = {} as GamePlatform;

  orders: Array<string> = [
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
    private gameService: GamesService,
    private platformsService: PlatformsGamesService,
    private dealsService: DealsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPathParams();
    this.fetchPlatforms();
    this.fetchDeals();
    this.setCurrentOrder();
  }

  navigate = () => {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        page: this.currentPage,
        order: this.currentOrder,
        platform: this.currentPlatform.id,
        search: this.currentSearch,
      },
    });
  };

  getPathParams = () => {
    this.activeRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.currentPlatform.id = params['platform'] || this.CLEAR_FIELD;
      this.currentOrder = params['order'] || this.CLEAR_FIELD;
      this.currentSearch = params['search'] || this.CLEAR_FIELD;
      this.refreshGames();
    });
  };

  refreshGames = async () => {
    this.fetchingGames = true;

    const response = await this.gameService
      .buildUrl({
        page: this.currentPage,
        platform: this.currentPlatform.id,
        order: this.currentOrder,
        name: this.currentSearch,
      })
      .fetchGames();

    if (response) {
      const { results, count } = response;
      this.games = results;
      this.collectionSize = count > this.MAX_COUNT ? this.MAX_COUNT : count;
    }

    this.fetchingGames = false;
  };

  fetchPlatforms = async () => {
    const response = await this.platformsService.getPlatforms();
    if (response) {
      this.platforms = response.results;
      this.setCurrentPlatform();
    }
  };

  setCurrentPlatform = () => {
    const platform = this.platforms.find(
      (p) => p.id == this.currentPlatform.id
    );
    if (platform) this.currentPlatform = platform;
  };

  setCurrentOrder = () => {
    const order = this.orders.find((o) => o == this.currentOrder);
    if (order) this.currentOrder = order;
  };

  fetchDeals = async () => {
    const response = await this.dealsService.getDeals({
      maxResults: 15,
      page: 0,
      title: '',
      lowerPrice: 0,
      upperPrice: 500,
    });
    if (response) {
      this.deals = response.deals;
    }
  };

  changePage(page: number): void {
    this.currentPage = page;
    this.navigate();
  }

  filterByOrder(order: string): void {
    this.currentPage = 1;
    this.currentOrder = order;
    if (this.currentOrder == this.INVALID_FIELD)
      this.currentOrder = this.CLEAR_FIELD;
    this.navigate();
  }

  filterByPlatform = (platform: string) => {
    this.currentPage = 1;
    let plat = this.platforms.find((p) => p.name == platform);
    this.currentPlatform.id = plat?.id || this.CLEAR_FIELD;
    this.navigate();
  };

  searchGame = (name: string) => {
    this.currentPage = 1;
    this.currentSearch = name;
    this.navigate();
  };
}
