import { Component, OnInit, Input } from '@angular/core';
import { GameDealInterface } from '../../interfaces/game-deal';

@Component({
  selector: 'app-deals-row',
  templateUrl: './deals-row.component.html',
  styleUrls: ['./deals-row.component.css']
})
export class DealsRowComponent {
  @Input() displayType: string;
  @Input() game: GameDealInterface;

  constructor() {
    this.displayType = 'row';
    this.game = {
      title: 'prueba',
      dealID: '',
      storeID: '',
      gameID: '',
      salePrice: 0,
      normalPrice: 0,
      savings: 0,
      metacriticScore: 0,
      thumb: ''
    };
  }

  ngOnInit(): void {
  }

}
