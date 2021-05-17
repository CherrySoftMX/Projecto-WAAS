import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output() onSignUp = new EventEmitter<any>();

  profileLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    remember: new FormControl(false),
  });

  constructor() {}

  ngOnInit(): void {}

  submit(): void {
    //login user
  }

  signUp() {
    this.onSignUp.emit();
  }

  validate(nameInput: string) {
    let classes = {
      'is-valid': this.profileLogin.get(nameInput)?.valid,
      'is-invalid':
        this.profileLogin.get(nameInput)?.invalid &&
        this.profileLogin.get(nameInput)?.touched,
    };

    return classes;
  }
}
