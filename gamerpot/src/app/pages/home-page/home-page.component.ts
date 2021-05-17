import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  items = [1, 3, 4, 5, 6, 7, 8, 3, 4, 4];
  constructor() { }

  ngOnInit(): void {
  }

}
