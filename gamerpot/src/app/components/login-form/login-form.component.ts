import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomainRoutes } from 'src/app/shared/routes';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  routes = DomainRoutes;

  @Output() onSignUp = new EventEmitter<any>();
  @Output() onForgotPassword = new EventEmitter<any>();

  profileLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    this.router.navigate([this.routes.HOME.PATH]);
  }

  signUp() {
    this.onSignUp.emit();
  }

  forgotPassword() {
    this.onForgotPassword.emit();
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
