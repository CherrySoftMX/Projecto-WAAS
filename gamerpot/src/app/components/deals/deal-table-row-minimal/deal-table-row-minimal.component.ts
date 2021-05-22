import { Component, Input, OnInit } from '@angular/core';
import { GameDealInterface } from 'src/app/interfaces/game-deal';

@Component({
  selector: 'app-deal-table-row-minimal',
  templateUrl: './deal-table-row-minimal.component.html',
  styleUrls: ['./deal-table-row-minimal.component.css'],
})
export class DealTableRowMinimalComponent implements OnInit {
  @Input() deal: GameDealInterface;

  constructor() {
    this.deal = {
      title: 'Grand Theft Auto V',
      dealID: '',
      storeID: '',
      gameID: '',
      salePrice: 0,
      normalPrice: 0,
      savings: 0,
      metacriticScore: 0,
      thumb: '',
      storeName: '',
      images: {
        icon: '',
      },
    };
  }

  ngOnInit(): void { }
}
