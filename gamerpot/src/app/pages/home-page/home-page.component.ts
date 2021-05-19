import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  items = new Array<number>(10).fill(0);
  deals = new Array<number>(15).fill(0);

  constructor() {}

  ngOnInit(): void {}
}
