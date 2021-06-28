import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordRegex } from 'src/app/shared/forms';
import { DomainRoutes } from 'src/app/shared/routes';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  routes = DomainRoutes;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.pattern(passwordRegex),
      Validators.required,
    ]),
    remember: new FormControl(true),
  });

  @Output() onSignUp = new EventEmitter<any>();
  @Output() onForgotPassword = new EventEmitter<any>();
  @Output() onLogin = new EventEmitter<any>();

  ngOnInit(): void {}

  get fields() {
    return this.loginForm.controls;
  }

  submit(): void {
    if (this.loginForm.invalid) return;

    this.onLogin.emit({
      email: this.fields.email.value,
      password: this.fields.password.value,
      rememberMe: this.fields.remember.value,
    });
  }

  signUp() {
    this.onSignUp.emit();
  }

  forgotPassword() {
    this.onForgotPassword.emit();
  }

  validate(inputName: string) {
    return {
      'is-valid': this.fields[inputName].valid,
      'is-invalid':
        this.fields[inputName].invalid && this.fields[inputName].touched,
    };
  }
}
