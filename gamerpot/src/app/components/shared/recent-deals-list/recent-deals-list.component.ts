import { Component, Input, OnInit } from '@angular/core';
import { IndividualDealInterface } from 'src/app/interfaces/individual-deal';
import { DealsService } from '../../../services/deals-service.service';

@Component({
  selector: 'app-recent-deals-list',
  templateUrl: './recent-deals-list.component.html',
  styleUrls: ['./recent-deals-list.component.css'],
})
export class RecentDealsListComponent implements OnInit {
  @Input() deals: Array<IndividualDealInterface> = [];
  @Input() showRandomDeals: boolean = false;

  constructor(private dealsService: DealsService) {}

  ngOnInit() {
    this.getDeals();
  }

  getDeals = async () => {
    if(!this.showRandomDeals) return;
    const response = await this.dealsService.getDeals({ page: 0 });
    this.deals = response.deals;
  };

}
