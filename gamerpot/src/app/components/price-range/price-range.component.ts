import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.css'],
})
export class PriceRangeComponent implements OnInit {
  @Output() minPriceEvent = new EventEmitter<string>();
  @Output() maxPriceEvent = new EventEmitter<string>();
  @Output() currencyEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  setMinPrice(minPrice: string) {
    this.minPriceEvent.emit(minPrice);
  }

  setMaxPrice(maxPrice: string) {
    this.maxPriceEvent.emit(maxPrice);
  }

  setCurrency(currency: string) {
    this.currencyEvent.emit(currency);
  }
}
