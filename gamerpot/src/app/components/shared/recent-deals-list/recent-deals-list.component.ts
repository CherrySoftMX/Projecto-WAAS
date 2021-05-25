import { Component, Input, OnInit } from '@angular/core';
import { IndividualDealInterface } from 'src/app/interfaces/individual-deal';

@Component({
  selector: 'app-recent-deals-list',
  templateUrl: './recent-deals-list.component.html',
  styleUrls: ['./recent-deals-list.component.css'],
})
export class RecentDealsListComponent implements OnInit {
  @Input() deals: Array<IndividualDealInterface> = [];

  constructor() {}

  ngOnInit(): void {}
}
