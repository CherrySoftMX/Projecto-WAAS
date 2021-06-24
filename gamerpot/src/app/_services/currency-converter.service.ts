import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, API_URL } from '../shared/apis/curr-conv-api';
import { Deal } from '../_models/deal';

interface DealsCurrencyConvertion {
  deals: Deal[];
  fromCurrency: string;
  toCurrency: string;
}

interface CurrencyConversion {
  fromCurrency?: string;
  toCurrency: string;
  amount?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  constructor(private http: HttpClient) {}

  fetchConvertionRate = async ({
    fromCurrency = 'USD',
    toCurrency = 'MXN',
  }: CurrencyConversion) => {
    const url = `${API_URL}?q=${fromCurrency}_${toCurrency}&compact=ultra&apiKey=${API_KEY}`;

    const response = (await this.http.get(url).toPromise()) as {
      [key: string]: any;
    };

    return response[`${fromCurrency}_${toCurrency}`];
  };

  calculateDealsNewCurrency = async ({
    deals,
    fromCurrency,
    toCurrency,
  }: DealsCurrencyConvertion) => {
    if (fromCurrency === toCurrency) return deals;

    const conversionRate = await this.fetchConvertionRate({
      fromCurrency,
      toCurrency,
    });

    return deals.map((deal) => {
      const salePrice = deal.salePrice * conversionRate;
      const normalPrice = deal.normalPrice * conversionRate;
      return { ...deal, salePrice, normalPrice };
    });
  };

  convertCurrency = async ({
    fromCurrency = 'USD',
    toCurrency = 'MXN',
    amount = '10',
  }: CurrencyConversion) => {
    const conversionRate = await this.fetchConvertionRate({
      fromCurrency,
      toCurrency,
    });

    return Number(amount) * conversionRate;
  };
}
