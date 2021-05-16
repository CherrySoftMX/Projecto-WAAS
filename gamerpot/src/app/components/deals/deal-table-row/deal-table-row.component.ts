import { Component, HostListener, Input, OnInit } from '@angular/core';
import { breakpoints } from 'src/app/constants/breakpoints';
import { GameDealInterface } from 'src/app/interfaces/game-deal';

@Component({
  selector: 'app-deal-table-row',
  templateUrl: './deal-table-row.component.html',
  styleUrls: ['./deal-table-row.component.css'],
})
export class DealTableRowComponent implements OnInit {
  @Input() displayType: 'row-normal' | 'row-minimal' = 'row-normal';
  @Input() deal: GameDealInterface;

  screenTooSmall: boolean = false;

  constructor() {
    this.deal = {
      title: '',
      dealID: '',
      storeID: '',
      gameID: '',
      salePrice: 0,
      normalPrice: 0,
      savings: 0,
      metacriticScore: 0,
      thumb: '',
      storeName: '',
      images: {
        icon: '',
      },
    };
  }

  ngOnInit(): void {
    this.screenTooSmall = this.isScreenTooSmall();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenTooSmall = this.isScreenTooSmall();
    console.log(this.screenTooSmall);
  }

  isScreenTooSmall() {
    return window.innerWidth < breakpoints.md;
  }
}
