import { Component, Input, OnInit } from '@angular/core';
import { Deal } from 'src/app/_models/deal';
import { DealsService } from '../../../_services/deals-service.service';

@Component({
  selector: 'app-recent-deals-list',
  templateUrl: './recent-deals-list.component.html',
  styleUrls: ['./recent-deals-list.component.css'],
})
export class RecentDealsListComponent implements OnInit {
  @Input() deals: Array<Deal> = [];
  @Input() showRandomDeals: boolean = false;

  constructor(private dealsService: DealsService) {}

  ngOnInit() {
    this.fetchDeals();
  }

  fetchDeals = async () => {
    if (!this.showRandomDeals) return;
    const response = await this.dealsService.buildUrl({ page: 0 }).fetchDeals();
    this.deals = response.deals;
  };
}
