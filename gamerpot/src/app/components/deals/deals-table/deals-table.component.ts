import { Component, Input, OnInit } from '@angular/core';
import { IndividualDealInterface } from 'src/app/interfaces/individual-deal';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.css'],
})
export class DealsTableComponent implements OnInit {
  @Input() deals: Array<IndividualDealInterface> = [];
  @Input() fetching: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
