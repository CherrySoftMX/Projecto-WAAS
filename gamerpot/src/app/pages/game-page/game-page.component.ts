import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { WishlistService } from 'src/app/_services/wishlist.service';
import { GameDetails } from '../../_models/game-details';
import { DealsService } from '../../_services/deals-service.service';
import { GameDatailsService } from '../../_services/game-details.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  gameDetails: GameDetails = {} as GameDetails;
  commentaries: Array<any> = [];

  fetchingGame = true;
  togglingFromWishlist = false;

  gameDeals: any = [];

  constructor(
    private gameDetailsService: GameDatailsService,
    private authService: AuthService,
    private wishlist: WishlistService,
    private dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchingGame = true;
    const id = this.route.snapshot.params.id;
    this.fetchGameDetails(id).then(() => {
      this.fetchingGame = false;
    });
  }

  async fetchGameDetails(id: number) {
    this.gameDetails = await this.gameDetailsService.fetchGameDetails(id);
    this.fetchGameDeals();
  }

  async fetchGameDeals() {
    this.gameDeals = await this.dealsService
      .buildUrl({ title: this.gameDetails.name, maxResults: 10 })
      .fetchDealsByGameName();
  }

  displayMore() {
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

  setMetacriticState() {
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

  addToWishlist() {
    this.authService.checkIfUserIsLogged();

    this.togglingFromWishlist = true;

    this.wishlist.toggleSave(this.gameDetails).finally(() => {
      this.togglingFromWishlist = false;
    });
  }
}
