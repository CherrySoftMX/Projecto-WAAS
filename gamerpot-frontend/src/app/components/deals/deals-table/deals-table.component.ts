import { Component, Input, OnInit } from '@angular/core';
import { Deal } from 'src/app/_models/deal';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.css'],
})
export class DealsTableComponent implements OnInit {
  @Input() deals: Array<Deal> = [];
  @Input() fetching: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
