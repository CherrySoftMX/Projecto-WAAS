import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameDetails } from 'src/app/_models/game-details';

@Component({
  selector: 'app-game-cards-container',
  templateUrl: './game-cards-container.component.html',
  styleUrls: ['./game-cards-container.component.css'],
})
export class GameCardsContainerComponent implements OnInit {
  @Input() games: GameDetails[] = [];

  @Input() page: number = 1;
  @Input() pageSize?: number;
  @Input() collectionSize?: number;

  @Input() fetchingGames: boolean = true;

  @Output() nextPage = new EventEmitter<number>();
  @Output() onRemovedFromWishlist = new EventEmitter<GameDetails>();

  constructor() {}

  ngOnInit(): void {}

  loadPage(page: number) {
    this.nextPage.emit(page);
  }

  onGameRemoved(game: GameDetails) {
    this.onRemovedFromWishlist.emit(game);
  }
}
