import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  profileLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(false),
  });
  constructor() { }

  ngOnInit(): void {


  }


  submit(): void {
    //login user
  }

  validate(nameInput: string) {

    let classes = {
      'is-valid': this.profileLogin.get(nameInput)?.valid,
      'is-invalid': this.profileLogin.get(nameInput)?.invalid && this.profileLogin.get(nameInput)?.touched
    }
    return classes;
  }

}
