import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDealListInterface } from '../../interfaces/game-deal-list';
import { IndividualDealInterface } from '../../interfaces/individual-deal';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { DealsService } from '../../services/deals-service.service';
import { StoresService } from '../../services/stores-service.service';

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
  readonly DEFAULT_CURRENCY = 'USD';

  search: string = 'search';
  minPrice: number = 0;
  maxPrice: number = 500;
  oldCurrency: string = this.DEFAULT_CURRENCY;
  actualCurrency: string = this.DEFAULT_CURRENCY;
  deals: any;
  stores: any;

  totalPages: number = 0;
  currentPage: number = 0;
  pageSize = 15;
  collectionSize: number = 1;

  fetching: boolean = true;

  constructor(
    private dealsService: DealsService,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private router: Router,
    private currencyConverter: CurrencyConverterService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.search = params['title'];
      this.minPrice = params['lowerPrice'];
      this.maxPrice = params['upperPrice'];
      this.fetchDeals();
    });
  }

  fetchDeals = async () => {
    this.fetching = true;

    const newDeals: GameDealListInterface = await this.dealsService.getDeals({
      page: this.currentPage - 1,
      title: this.search,
      lowerPrice: this.minPrice,
      upperPrice: this.maxPrice,
    });

    this.stores = await this.storesService.getStores();
    const dealsList = newDeals.deals;
    this.deals = dealsList.map(
      (deal: any) => (deal = { ...this.stores[deal.storeID - 1], ...deal })
    );

    this.totalPages = Number(newDeals.totalPages);
    this.collectionSize = this.totalPages * this.pageSize;

    if (this.actualCurrency != this.DEFAULT_CURRENCY) {
      this.deals = await this.calculateDealsNewCurrency({
        deals: this.deals,
        fromCurrency: this.oldCurrency,
        toCurrency: this.actualCurrency,
      });
    }

    this.fetching = false;
  };

  buscar(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        title: query.length > 0 ? query : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  setMinPrice = async (price: string) => {
    price = await this.calculatePriceFilters(price);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        lowerPrice: price.length > 0 ? price : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  };

  setMaxPrice = async (price: string) => {
    price = await this.calculatePriceFilters(price);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        upperPrice: price.length > 0 ? price : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  };

  setCurrency = async (cur: string) => {
    if (cur == this.actualCurrency) return;

    this.oldCurrency = this.actualCurrency;
    this.actualCurrency = cur;
    this.deals = await this.calculateDealsNewCurrency({
      deals: this.deals,
      fromCurrency: this.oldCurrency,
      toCurrency: this.actualCurrency,
    });
  };

  calculateDealsNewCurrency = async ({
    deals,
    fromCurrency,
    toCurrency,
  }: DealsCurrencyConvertInterface) => {
    const response: any = await this.currencyConverter.getCurrencyConversion({
      from: fromCurrency,
      to: toCurrency,
    });
    const conversionRate = response[`${fromCurrency}_${toCurrency}`];
    const convertedDeals = deals.map((deal: IndividualDealInterface) => {
      const salePrice = deal.salePrice * conversionRate;
      const normalPrice = deal.normalPrice * conversionRate;
      return { ...deal, salePrice, normalPrice };
    });
    return convertedDeals;
  };

  calculatePriceFilters = async (price: string) => {
    if (this.actualCurrency != this.DEFAULT_CURRENCY) {
      if (price.length == 0) return price;
      const convertedPrice = await this.currencyConverter.currencyConvert({
        from: this.actualCurrency,
        to: this.oldCurrency,
        amount: price,
      });
      price = Math.round(convertedPrice).toString();
    }
    return price;
  };
}
