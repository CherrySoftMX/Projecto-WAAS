import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, QueryParamsHandling, Router } from '@angular/router';
import { removeNullProperties } from 'src/app/services/utils/object-utils';
import { IndividualDealInterface } from '../../interfaces/individual-deal';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { DealsService } from '../../services/deals-service.service';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.css'],
})
export class DealsPageComponent implements OnInit {
  readonly DEFAULT_CURRENCY = 'USD';

  search: string = '';

  inputLowerPrice: string = '';
  inputUpperPrice: string = '';

  lowerPriceUSD: string = '0';
  upperPriceUSD: string = '500';

  oldCurrency: string = this.DEFAULT_CURRENCY;
  actualCurrency: string = this.DEFAULT_CURRENCY;

  deals: IndividualDealInterface[] = [];

  totalPages: number = 0;
  currentPage: number = 0;
  pageSize = 15;
  collectionSize: number = 1;

  fetching: boolean = true;

  constructor(
    private dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    private currencyConverter: CurrencyConverterService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.search = params['title'];
      this.lowerPriceUSD = params['lowerPrice'];
      this.upperPriceUSD = params['upperPrice'];
      this.fetchDeals();
    });
  }

  navigate(params: any, queryParamsHandling?: QueryParamsHandling) {
    removeNullProperties(params);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...params,
      },
      queryParamsHandling,
    });
  }

  fetchDeals = async () => {
    this.fetching = true;

    const { deals, totalPages } = await this.dealsService
      .buildUrl({
        page: this.currentPage - 1,
        title: this.search,
        lowerPrice: this.lowerPriceUSD,
        upperPrice: this.upperPriceUSD,
      })
      .fetchDeals();

    this.deals = deals;
    this.totalPages = totalPages;
    this.collectionSize = this.totalPages * this.pageSize;

    if (this.actualCurrency !== this.DEFAULT_CURRENCY)
      this.updateDealsCurrency();

    this.fetching = false;
  };

  updateDealsCurrency = async () => {
    this.deals = await this.currencyConverter.calculateDealsNewCurrency({
      deals: this.deals,
      fromCurrency: this.oldCurrency,
      toCurrency: this.actualCurrency,
    });
  };

  searchGame(query: string) {
    this.navigate({ title: query });
  }

  filterGamesByPrice = async (args: string) => {
    const lowerPriceUSD = await this.calculatePriceToUSD(this.inputLowerPrice);
    const upperPriceUSD = await this.calculatePriceToUSD(this.inputUpperPrice);

    this.navigate({
      lowerPrice: lowerPriceUSD,
      upperPrice: upperPriceUSD,
    });
  };

  setCurrency = async (cur: string) => {
    this.oldCurrency = this.actualCurrency;
    this.actualCurrency = cur;
    this.updateDealsCurrency();
  };

  calculatePriceToUSD = async (price: string) => {
    if (this.actualCurrency !== this.DEFAULT_CURRENCY) {
      if (!price) return price;

      const convertedPrice = await this.currencyConverter.convertCurrency({
        fromCurrency: this.actualCurrency,
        toCurrency: this.DEFAULT_CURRENCY,
        amount: price,
      });

      price = Math.round(convertedPrice).toString();
    }

    return price;
  };
}
