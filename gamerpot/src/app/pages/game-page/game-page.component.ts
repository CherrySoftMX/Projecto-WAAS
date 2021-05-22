import { Component, Input, OnInit } from '@angular/core';
import { GameDetails } from '../../interfaces/game-details';
import { DealsService } from '../../services/deals-service.service';
import { GameDatailsService } from '../../services/game-details.service';
import { StoresService } from '../../services/stores-service.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  @Input() id: number; //maybe a param in url
  gameDetails: GameDetails;
  commentaries: any;
  deals: any;
  stores: any;

  constructor(
    private gameDetailsService: GameDatailsService,
    private dealsService: DealsService,
    private storesService: StoresService
  ) {
    this.id = 22121;
    this.commentaries = Array<number>(10).fill(0);
    this.gameDetails = {
      id: 0,
      slug: '',
      name: '',
      playtime: 0,
      name_original: '',
      description: '',
      description_raw: '',
      metacritic: 0,
      released: '',
      updated: '',
      background_image: '',
      background_image_additional: '',
      website: '',
      platforms: [],
      developers: [],
      genres: [],
      publishers: [],
    };
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.gameDetailsService.getGameDetails(this.id).then(
      (res) => {
        this.gameDetails = res;
        this.getDealsGame();
        this.getStores();
      },
      (error) => {}
    );
  }

  getDealsGame(): void {
    this.dealsService.getDealsByNameGame(this.gameDetails.name).then(
      (res) => {
        this.deals = res;
      },
      (error) => {}
    );
  }

  getStores(): void {
    this.storesService.getStores().then(
      (res) => {
        this.stores = res;
        this.deals = this.deals.map(
          (deal: any) => (deal = { ...this.stores[deal.storeID], ...deal })
        );
        console.log(this.deals);
      },
      (error) => {}
    );
  }

  displayMore(): void {
    const more = document.getElementById('more');
    const moreBtn = document.getElementById('more-btn');
    const dots = document.getElementById('dots');

    if (more && moreBtn && dots) {
      if (document.getElementById('more')?.style.display == 'none') {
        more.style.display = 'inline';
        moreBtn.innerHTML = 'Less more';
        dots.style.display = 'none';
      } else {
        more.style.display = 'none';
        moreBtn.innerHTML = 'See more';
        dots.style.display = 'inline';
      }
    }
  }

  setMetacriticState(): any {
    const metacritic = this.gameDetails.metacritic;
    const nm = metacritic == null;
    const lm = metacritic <= 30;
    const mm = metacritic > 30 && metacritic < 70;
    const hm = metacritic >= 70;
    let classes = {
      'no-metacritic': nm,
      'metacritic-low': lm,
      'metacritic-medium': mm,
      'metacritic-high': hm,
    };

    return classes;
  }

  addWishlistGame(): void {
    console.log('game added');
  }
}
