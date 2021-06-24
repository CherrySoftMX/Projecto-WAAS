import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomainRoutes } from 'src/app/shared/routes';
import { GameDetails } from 'src/app/_models/game-details';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  routes = DomainRoutes;

  @Input() gameDetails: GameDetails = {} as GameDetails;

  @Output() saveGame = new EventEmitter<any>();

  constructor() {}

  ngOnInit = () => {};

  onSaveGame = (event: MouseEvent) => {
    event.stopPropagation();
    this.saveGame.emit();
  };
}
