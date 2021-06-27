import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDetails } from 'src/app/_models/game-details';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css'],
})
export class WishlistPageComponent implements OnInit {
  wishlist: GameDetails[] = [];
  loggedUser: User | null;

  currentPage = 1;
  collectionSize = 0;

  loading = true;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUser = authService.currentUserValue;
  }

  ngOnInit(): void {
    this.fetchWishlist();
    this.getPathParams();
  }

  fetchWishlist() {
    this.loading = true;
    this.wishlistService
      .fetchWishlist(this.currentPage)
      .then((result) => {
        const [totalCount, wishlist] = result;

        this.collectionSize = totalCount;
        this.wishlist = wishlist;
        this.loading = false;
      })
      .catch((err) => (this.loading = false));
  }

  navigate() {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        page: this.currentPage,
      },
    });
  }

  getPathParams() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.fetchWishlist();
    });
  }

  onGameRemoved(game: GameDetails) {
    this.wishlist = this.wishlist.filter((g) => g.id != game.id);
    this.collectionSize--;

    if (this.wishlist.length === 0 && this.currentPage > 1) {
      this.currentPage--;
      this.navigate();
    }
  }
}
