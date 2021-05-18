import { Component, Input, OnInit } from '@angular/core';
import { GameDatailsService } from '../../services/game-datails.service';
import { GameDetails } from '../../interfaces/game-details';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  @Input() id: number = 1;
  gameDetails: GameDetails;
  platforms: any;

  constructor(private gameDetailsService: GameDatailsService) { }

  ngOnInit(): void {
    this.gameDetails = this.get();

  }

  get() {

    this.gameDetailsService.getGameDetails(this.id).then((res) => {
      this.gameDetails = res;
      this.platforms = this.gameDetails.platforms;

    }, (error) => {
      alert('F');
    })
  }

}
