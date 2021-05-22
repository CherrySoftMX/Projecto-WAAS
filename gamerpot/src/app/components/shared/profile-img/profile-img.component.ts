import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.css'],
})
export class ProfileImgComponent implements OnInit {
  @Input() label: string = 'Shadic';
  @Input() imgUrl: string = 'http://unsplash.it/50/50';

  constructor() {}

  ngOnInit(): void {}
}
