import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginFormComponent],
        imports: [ReactiveFormsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should detect form is valid', () => {
    component.loginForm.controls.email.setValue('admin@gmail.com');
    component.loginForm.controls.password.setValue('Uu1234589');

    fixture.nativeElement.querySelector('#loginBtn').click();

    expect(component.loginForm.valid).toBe(true);
  });

  it('should detect form is invalid', () => {
    fixture.nativeElement.querySelector('#loginBtn').click();
    expect(component.loginForm.invalid).toBe(true);
  });
});
