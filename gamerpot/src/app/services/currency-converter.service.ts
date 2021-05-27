import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface CurrencyConversionInterface {
  from?: string;
  to: string;
}

interface CurrencyConvertInterface extends CurrencyConversionInterface {
  amount: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private apiUrl: string = 'https://free.currconv.com/api/v7/convert';
  private apiKey: string = 'ede53dc629882653093f';

  constructor(private http: HttpClient) {}

  getCurrencyConversion = async ({
    from = 'USD',
    to = 'MXN',
  }: CurrencyConversionInterface) => {
    const url = `${this.apiUrl}?q=${from}_${to}&compact=ultra&apiKey=${this.apiKey}`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  };

  currencyConvert = async ({
    from = 'USD',
    to = 'MXN',
    amount = '10',
  }: CurrencyConvertInterface) => {
    const response: any = await this.getCurrencyConversion({ from, to });
    const conversionRate = response[`${from}_${to}`];
    const conversion = Number(amount) * conversionRate;
    return conversion;
  };
}
