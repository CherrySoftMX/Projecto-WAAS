import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GameDealInterface } from 'src/app/interfaces/game-deal';
import { breakpoints } from 'src/app/shared/breakpoints';

@Component({
  selector: 'app-deal-table-row',
  templateUrl: './deal-table-row.component.html',
  styleUrls: ['./deal-table-row.component.css'],
})
export class DealTableRowComponent implements OnInit {
  @Input() deal: GameDealInterface;

  screenTooSmall: boolean = false;

  constructor() {
    this.deal = {
      title: 'Grand Theft Auto V',
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
  }

  isScreenTooSmall() {
    return window.innerWidth < breakpoints.md;
  }

  redirectToDeal() {
    window.open(`https://www.cheapshark.com/redirect?dealID=${this.deal.dealID}`, "_blank");
  }

}
