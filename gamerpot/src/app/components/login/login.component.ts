import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
  }


  submit(): void {
    //check login
  }

}
