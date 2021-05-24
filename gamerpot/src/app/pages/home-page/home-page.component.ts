import { Component, OnInit } from '@angular/core';
import { GameDetails } from 'src/app/interfaces/game-details';
import { BestGamesService } from 'src/app/services/best-games.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  games: Array<GameDetails> = [];

  currentPage: number = 1;
  totalPages: number = 0;
  fetchingGames: boolean = true;

  constructor(private bestGameService: BestGamesService) {}

  ngOnInit(): void {
    this.getGameResponse(this.currentPage);
  }

  getGameResponse = async (page: number) => {
    this.fetchingGames = true;

    const response = await this.bestGameService.getBestGames(80, 100, 12, page);
    const { results, count } = response;

    this.games = results;
    this.totalPages = count;
    this.fetchingGames = false;
  };

  loadGamesPage(page: number): void {
    this.currentPage = page;
    this.getGameResponse(this.currentPage);
  }
}
