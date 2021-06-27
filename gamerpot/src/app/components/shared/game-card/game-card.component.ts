import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DomainRoutes } from 'src/app/shared/routes';
import { GameDetails } from 'src/app/_models/game-details';
import { AuthService } from 'src/app/_services/auth.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  routes = DomainRoutes;
  loading = false;

  @Input() gameDetails: GameDetails = {} as GameDetails;

  @Output() onRemovedFromWishlist = new EventEmitter<GameDetails>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit = () => {};

  addToWishlist = (event: MouseEvent) => {
    event.stopPropagation();

    this.authService.checkIfUserIsLogged();

    this.loading = true;

    this.wishlistService
      .toggleSave(this.gameDetails)
      .then((result) => {
        if (!this.gameDetails.savedByLoggedUser)
          this.onRemovedFromWishlist.emit(this.gameDetails);
      })
      .finally(() => {
        this.loading = false;
      });
  };
}
