import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { GameDetails } from 'src/app/interfaces/game-details';
import { GameResponse } from 'src/app/interfaces/game-response';
import { BestGamesService } from 'src/app/services/best-games.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {

  items: Array<GameDetails>;
  deals = new Array<number>(15).fill(0);
  gameResponse: GameResponse;
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(private bestGameService: BestGamesService) {
    this.gameResponse = {
      count: 0,
      next: '',
      previous: '',
      results: []
    }
    this.items = [];
  }

  ngOnInit(): void {
    this.getGameResponse(this.currentPage);
  }

  getGameResponse(page: number): void {
    this.bestGameService.getBestGames(80, 100, 12, page).then((res) => {
      this.gameResponse = res;
      this.items = this.gameResponse.results;
      this.totalPages = this.gameResponse.count;
    }, (error) => {
      rejects(error);
    })
  }

  getNewItems(page: number): void {
    this.currentPage = page;
    console.log(page);
    this.getGameResponse(this.currentPage);
  }
}
