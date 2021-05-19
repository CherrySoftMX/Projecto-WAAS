import { Component, Input, OnInit } from '@angular/core';
import { GameDatailsService } from '../../services/game-details.service';
import { GameDetails } from '../../interfaces/game-details';
import { DealsService } from '../../services/deals-service.service'
import { StoresService } from '../../services/stores-service.service'

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  @Input() id: number;
  gameDetails: GameDetails | undefined;
  deals: any;
  stores: any;



  constructor(private gameDetailsService: GameDatailsService,
    private dealsService: DealsService, private storesService: StoresService) {
    this.id = 33311;
    this.gameDetails?.description.substr(300);
  }

  ngOnInit(): void {
    this.get();

  }

  get = () => {

    this.gameDetailsService.getGameDetails(this.id).then((res) => {
      this.gameDetails = res;
      this.dealsService.getDealsByNameGame(this.gameDetails.name).then(
        (res) => {
          this.deals = res;
          this.storesService.getStores().then((res) => {
            this.stores = res;
            this.deals = this.deals.map(
              (deal: any) => (deal = { ...this.stores[deal.storeID], ...deal })
            );
            console.log(this.deals);
          },
            (error) => {

            })
        },
        (error) => {

        }
      )
    }, (error) => {
      alert('F');
    })



  }

  displayMore() {
    if (document.getElementById('more')?.style.display == 'none') {
      document.getElementById('more')?.style.display = 'inline';
      document.getElementById('more-btn')?.innerHTML = 'Less more';
      document.getElementById('dots')?.style.display = 'none';
    } else {
      console.log("Nooo")
      document.getElementById('more')?.style.display = 'none';
      document.getElementById('more-btn')?.innerHTML = 'See more';
      document.getElementById('dots')?.style.display = 'inline';
    }
  }

  setMetacriticState() {

    if (this.gameDetails) {
      const metacritic = this.gameDetails.metacritic;
      const nm = metacritic == null;
      const lm = metacritic <= 30;
      const mm = metacritic > 30 && metacritic < 70;
      const hm = metacritic >= 70;
      let classes = {
        'no-metacritic': nm,
        'metacritic-low': lm,
        'metacritic-medium': mm,
        'metacritic-high': hm
      }

      return classes;
    }

    return {

    }
  }

}
