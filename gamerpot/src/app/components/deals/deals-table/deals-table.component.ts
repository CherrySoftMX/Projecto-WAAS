import { Component, Input, OnInit } from '@angular/core';
import { GameDealInterface } from 'src/app/interfaces/game-deal';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.css'],
})
export class DealsTableComponent implements OnInit {
  @Input() deals: GameDealInterface[] = [];

  constructor() {}

  ngOnInit(): void {}
}
