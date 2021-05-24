import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  gameDetails: GameDetails = {} as GameDetails;
  commentaries: Array<any> = [];
  fetching: boolean = true;

  constructor(
    private gameDetailsService: GameDatailsService,
    private route: ActivatedRoute,
    private dealsService: DealsService,
    private storesService: StoresService
  ) {}

  ngOnInit() {
    this.fetching = true;
    const id = this.route.snapshot.params.id;
    this.loadGameDetails(id).then(() => {
      this.fetching = false;
    });
  }

  loadGameDetails = async (id: number) => {
    this.gameDetails = await this.gameDetailsService.getGameDetails(id);
    this.getDealsGame();
    this.getStores();
  };

  getDealsGame(): void {}

  getStores(): void {}

  displayMore(): void {
    const more = document.getElementById('more');
    const moreBtn = document.getElementById('more-btn');
    const dots = document.getElementById('dots');

    if (more && moreBtn && dots) {
      if (document.getElementById('more')?.style.display == 'none') {
        more.style.display = 'inline';
        moreBtn.innerHTML = 'Show less';
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

  addToWishlist(): void {
    console.log('game added');
  }
}
