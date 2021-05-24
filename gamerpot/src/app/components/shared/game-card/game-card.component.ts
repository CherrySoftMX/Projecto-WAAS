import { Component, Input, OnInit } from '@angular/core';
import { GameDetails } from 'src/app/interfaces/game-details';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input() title: string = 'Default title';
  @Input() gameDetails: GameDetails;

  constructor() {
    this.gameDetails = {
      id: 0,
      slug: '',
      name: '',
      playtime: 0,
      name_original: '',
      description: '',
      description_raw: '',
      metacritic: 0,
      released: '',
      updated: '',
      background_image: '',
      background_image_additional: '',
      website: '',
      platforms: [],
      developers: [],
      genres: [],
      publishers: [],
    };
  }

  ngOnInit(): void {}
}
