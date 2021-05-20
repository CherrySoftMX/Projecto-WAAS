import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css'],
})
export class WishlistPageComponent implements OnInit {
  items = new Array<number>(10).fill(0);
  deals = new Array<number>(15).fill(0);

  constructor() {}

  ngOnInit(): void {}
}
