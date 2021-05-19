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
    this.id = 5000;
  }

  ngOnInit(): void {
    this.get();
    this.getDeals();
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
  getDeals = () => {



  };

}
