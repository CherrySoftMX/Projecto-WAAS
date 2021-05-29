import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualDealInterface } from '../interfaces/individual-deal';
import {
  DEALS_END_POINT,
  STORES_END_POINT,
} from '../shared/apis/cheap-shark-api';
import { StoresService } from './stores-service.service';
import { UrlBuilder } from './utils/url-builder';

interface DealsSearchParams {
  [key: string]: any;

  page: number;
  pageSize?: number;
  params?: string;
  title?: string;
  lowerPrice?: string;
  upperPrice?: string;
}

const DEFAULT_URL_PARAMS: DealsSearchParams = {
  page: 0,
  title: '',
  pageSize: 15,
  lowerPrice: '0',
  upperPrice: '500',
};

@Injectable({
  providedIn: 'root',
})
export class DealsService extends UrlBuilder<DealsSearchParams> {
  constructor(private http: HttpClient, private storeService: StoresService) {
    super(DEALS_END_POINT, DEFAULT_URL_PARAMS);
  }

  fetchDeals = async (url?: string) => {
    const fetchUrl = url || this.url;

    const response = await this.http
      .get<IndividualDealInterface[]>(fetchUrl, { observe: 'response' })
      .toPromise();

    const stores = await this.http.get<any>(STORES_END_POINT).toPromise();

    const deals: IndividualDealInterface[] = response.body!.map((deal) => ({
      ...stores[deal.storeID - 1],
      ...deal,
    }));

    const totalPages = Number(response.headers.get('x-total-page-count')!);
    return { deals, totalPages };
  };

  fetchDealsByGameName = (url?: string): Promise<IndividualDealInterface> => {
    const fetchUrl = url || this.url;
    return this.http.get<IndividualDealInterface>(fetchUrl).toPromise();
  };
}
