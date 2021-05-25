import { Component, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals-service.service';
import { StoresService } from '../../services/stores-service.service';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { GameDealListInterface } from '../../interfaces/game-deal-list';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { IndividualDealInterface } from '../../interfaces/individual-deal';

interface DealsCurrencyConvertInterface {
  deals: Array<IndividualDealInterface>;
  fromCurrency: string;
  toCurrency: string;
}

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.css'],
})
export class DealsPageComponent implements OnInit {
  search: string;
  minPrice: number;
  maxPrice: number;
  oldCurrency: string;
  actualCurrency: string;
  totalPages: number;
  deals: any;
  stores: any;
  currentPage: number;
  pageSize = 15;
  collectionSize: number;
  DEFAULT_CURRENCY = 'USD';

  constructor(
    private dealsService: DealsService,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private router: Router,
    private currencyConverter: CurrencyConverterService
  ) {
    this.search = 'busqueda';
    this.minPrice = 0;
    this.maxPrice = 500;
    this.oldCurrency = this.DEFAULT_CURRENCY;
    this.actualCurrency = this.DEFAULT_CURRENCY;
    this.dealsService = dealsService;
    this.storesService = storesService;
    this.currentPage = 0;
    this.totalPages = 0;
    this.collectionSize = 1;
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
    const newDeals: GameDealListInterface = await this.dealsService.getDeals({
      page: this.currentPage - 1,
      title: this.search ,
      lowerPrice: this.minPrice,
      upperPrice: this.maxPrice
    });
    this.stores = await this.storesService.getStores();
    const dealsList = newDeals.deals;
    this.deals = dealsList.map(
      (deal: any) => (deal = { ...this.stores[deal.storeID - 1], ...deal })
    );
    this.totalPages = Number(newDeals.totalPages);
    this.collectionSize = this.totalPages * this.pageSize;
    if(this.actualCurrency != this.DEFAULT_CURRENCY) {
      this.deals = await this.calculateDealsNewCurrency({
        deals: this.deals,
        fromCurrency: this.oldCurrency,
        toCurrency: this.actualCurrency
      });
    }
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

  setMinPrice = async (price: string) => {
    price = await this.calculatePriceFilters(price);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        lowerPrice: price.length > 0 ? price: null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  };

  setMaxPrice = async (price: string) => {
    price = await this.calculatePriceFilters(price);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        upperPrice: price.length > 0 ? price: null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  };

  setCurrency = async (cur: string) => {
    if(cur == this.actualCurrency) return;
    this.oldCurrency = this.actualCurrency;
    this.actualCurrency = cur;
    this.deals = await this.calculateDealsNewCurrency({
      deals: this.deals,
      fromCurrency: this.oldCurrency,
      toCurrency: this.actualCurrency
    });
  };

  changePage(newPage: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge'
    });
  }

  calculateDealsNewCurrency = async ({
    deals,
    fromCurrency,
    toCurrency
  }: DealsCurrencyConvertInterface) => {
    const response: any = await this.currencyConverter.getCurrencyConversion({ from: fromCurrency,  to: toCurrency });
    const conversionRate = response[`${fromCurrency}_${toCurrency}`];
    console.log(conversionRate);
    const convertedDeals = deals.map((deal: IndividualDealInterface) => {
      const salePrice = deal.salePrice * conversionRate;
      const normalPrice = deal.normalPrice * conversionRate;
      return { ...deal, salePrice, normalPrice };
    });
    return convertedDeals;
  };

  calculatePriceFilters = async (price: string) => {
    if(this.actualCurrency != this.DEFAULT_CURRENCY) {
      if(price.length == 0) return price;
      const convertedPrice = await this.currencyConverter.currencyConvert({
        from: this.actualCurrency,
        to: this.oldCurrency,
        amount: price
      });
      price = Math.round(convertedPrice).toString();
    }
    return price;
  };

}
