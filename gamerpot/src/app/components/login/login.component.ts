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
    password: new FormControl(''),
    remember: new FormControl(false),
  });
  constructor() { }

  ngOnInit(): void {
  }


  submit(): void {
    alert(' email: ' + this.profileLogin.get('email')?.value +
      ' password: ' + this.profileLogin.get('password')?.value +
      ' remember?: ' + this.profileLogin.get("remember")?.value)
  }

}
