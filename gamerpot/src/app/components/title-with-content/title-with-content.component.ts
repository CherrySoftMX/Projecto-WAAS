import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-with-content',
  templateUrl: './title-with-content.component.html',
  styleUrls: ['./title-with-content.component.css'],
})
export class TitleWithContentComponent implements OnInit {
  @Input() title: string;

  constructor() {
    this.title = 'Default title';
  }

  ngOnInit(): void {}
}
