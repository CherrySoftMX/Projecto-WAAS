import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordFormComponent } from 'src/app/components/forgot-password-form/forgot-password-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(public modalService: NgbModal) {}

  ngOnInit(): void {}

  openForgotModal() {
    const modalRef = this.modalService.open(ForgotPasswordFormComponent);
  }
  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterFormComponent);
  }
}
