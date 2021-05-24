import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameDetails } from 'src/app/interfaces/game-details';

@Component({
  selector: 'app-game-cards-container',
  templateUrl: './game-cards-container.component.html',
  styleUrls: ['./game-cards-container.component.css'],
})
export class GameCardsContainerComponent implements OnInit {
  @Input() games: Array<GameDetails> = [];
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Input() fetchingGames: boolean = true;

  @Output() nextPage = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  loadPage(page: number) {
    this.nextPage.emit(page);
  }
}
