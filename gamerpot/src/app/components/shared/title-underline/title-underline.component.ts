import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-underline',
  templateUrl: './title-underline.component.html',
  styleUrls: ['./title-underline.component.css'],
})
export class TitleUnderlineComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
