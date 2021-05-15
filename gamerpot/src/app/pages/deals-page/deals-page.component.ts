import { Component, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals-service.service';
import { StoresService } from '../../services/stores-service.service';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.css'],
})
export class DealsPageComponent implements OnInit {
  search:string;
  minPrice:string;
  maxPrice:string;
  currency:string;
  dealsService:DealsService;
  storesService:StoresService;
  deals: any;
  stores:any;

  constructor(dealsService:DealsService, storesService:StoresService) {
    this.search = 'busqueda';
    this.minPrice = '0';
    this.maxPrice = '500';
    this.currency = 'USD';
    this.dealsService = dealsService;
    this.storesService = storesService;
  }

  ngOnInit(): void {
    this.getDeals();
  }

  getDeals = async () => {
    this.deals = await this.dealsService.getDeals();
    this.stores = await this.storesService.getStores();
    this.deals = this.deals.map((deal:any) => (
      deal = {...this.stores[deal.storeID], ...deal}
    ));
  }

  buscar(query:string) {
    this.search = query;
  }

  setMinPrice(price: string) {
    this.minPrice = price;
  }

  setMaxPrice(price: string) {
    this.maxPrice = price;
  }

  setCurrency(cur: string) {
    this.currency = cur;
  }
}
