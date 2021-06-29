import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ForgotPasswordFormComponent } from 'src/app/components/forgot-password-form/forgot-password-form.component';
import { AuthService } from 'src/app/_services/auth.service';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loading: boolean = false;
  returnUrl: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(credentials: any) {
    const { email, password, rememberMe } = credentials;

    this.loading = true;

    this.authService
      .login(email, password, rememberMe)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          window.alert(error);
          this.loading = false;
        }
      );
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterFormComponent);

    modalRef.result.then((result) => {
      this.onLogin({ email: result.email, password: result.password });
    });
  }

  openForgotModal() {
    const modalRef = this.modalService.open(ForgotPasswordFormComponent);
  }
}
