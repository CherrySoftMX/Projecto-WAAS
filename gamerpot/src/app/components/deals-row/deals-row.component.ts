import { Component, Input } from '@angular/core';
import { GameDealInterface } from '../../interfaces/game-deal';

@Component({
  selector: 'app-deals-row',
  templateUrl: './deals-row.component.html',
  styleUrls: ['./deals-row.component.css'],
})
export class DealsRowComponent {
  // row, row-condensed, row-minimal
  @Input() displayType: string;
  @Input() game: GameDealInterface;

  constructor() {
    this.displayType = 'row';
    this.game = {
      title: '',
      dealID: '',
      storeID: '',
      gameID: '',
      salePrice: 0,
      normalPrice: 0,
      savings: 0,
      metacriticScore: 0,
      thumb: '',
      storeName: '',
      storeIcon: '',
    };
  }

  ngOnInit(): void {}
}
