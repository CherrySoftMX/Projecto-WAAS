import { Component, OnInit } from '@angular/core';
import { GameDealInterface } from '../../interfaces/game-deal';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.css']
})
export class DealsPageComponent implements OnInit {
  gameDeal: GameDealInterface;
  search:string;
  minPrice:string;
  maxPrice:string;
  currency:string;

  constructor() {
    this.gameDeal = {
      title: 'NieR:Automata',
      dealID: '123132',
      storeID: '1',
      gameID: '12',
      salePrice: 19.99,
      normalPrice: 39.99,
      savings: 50,
      metacriticScore: 88,
      thumb: 'https://cdn.cloudflare.steamstatic.com/steam/apps/524220/capsule_sm_120.jpg?t=1601026299',
      storeName: 'Steam',
      storeIcon: 'https://www.cheapshark.com/img/stores/icons/0.png'
    };
    this.search = 'busqueda';
    this.minPrice = '0';
    this.maxPrice = '500';
    this.currency = 'USD';
  }

  ngOnInit(): void {
  }

  buscar(query:string) {
    this.search = query;
  }

  setMinPrice(price:string) {
    this.minPrice = price;
  }

  setMaxPrice(price:string) {
    this.maxPrice = price;
  }

  setCurrency(cur:string) {
    this.currency = cur;
  }

}
