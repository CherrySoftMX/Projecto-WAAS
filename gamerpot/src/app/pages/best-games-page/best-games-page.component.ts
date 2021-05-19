import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-games-page',
  templateUrl: './best-games-page.component.html',
  styleUrls: ['./best-games-page.component.css'],
})
export class BestGamesPageComponent implements OnInit {
  bestGames = new Array<number>(30).fill(0);

  constructor() {}

  ngOnInit(): void {}
}
