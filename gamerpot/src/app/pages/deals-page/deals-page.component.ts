import { Component, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals-service.service';
import { StoresService } from '../../services/stores-service.service';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.css'],
})
export class DealsPageComponent implements OnInit {
  search: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  deals: any;
  stores: any;
  currentPage: number;

  constructor(
    private dealsService: DealsService,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.search = 'busqueda';
    this.minPrice = 0;
    this.maxPrice = 500;
    this.currency = 'USD';
    this.dealsService = dealsService;
    this.storesService = storesService;
    this.currentPage = 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.search = params['title'];
      this.minPrice = params['lowerPrice'];
      this.maxPrice = params['upperPrice'];
      this.getDeals();
    });
  }

  getDeals = async () => {
    this.deals = await this.dealsService.getDeals({
      page: this.currentPage - 1,
      title: this.search ,
      lowerPrice: this.minPrice,
      upperPrice: this.maxPrice
    });
    this.stores = await this.storesService.getStores();
    this.deals = this.deals.map(
      (deal: any) => (deal = { ...this.stores[deal.storeID - 1], ...deal })
    );
  };

  buscar(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        title: query.length > 0 ? query: null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  setMinPrice(price: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        lowerPrice: price.length > 0 ? price: null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  setMaxPrice(price: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        upperPrice: price.length > 0 ? price: null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  setCurrency(cur: string) {
    this.currency = cur;
  }

  changePage(newPage: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge'
    });
  }

}
