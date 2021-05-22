import { Component, Input, OnInit } from '@angular/core';
import { GameDealInterface } from 'src/app/interfaces/game-deal';

@Component({
  selector: 'app-recent-deals-list',
  templateUrl: './recent-deals-list.component.html',
  styleUrls: ['./recent-deals-list.component.css'],
})
export class RecentDealsListComponent implements OnInit {
  @Input() deals: GameDealInterface[] = [];

  constructor() {}

  ngOnInit(): void {}
}
