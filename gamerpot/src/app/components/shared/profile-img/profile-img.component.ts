import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.css'],
})
export class ProfileImgComponent implements OnInit {
  @Input() label: string = '';
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
