import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { passwordRegex } from 'src/app/shared/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = new FormGroup({});

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService
  ) {
    this.registerForm = new FormBuilder().group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.pattern(passwordRegex),
          Validators.required,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.passwordsShouldMatch }
    );
  }

  ngOnInit(): void {}

  register() {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.fields;

    const userInfo = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    this.authService
      .register(userInfo.name, userInfo.email, userInfo.password)
      .then((result) => {
        this.closeModal({ email: result.email, password: password.value });
      })
      .catch((err) => window.alert(err));
  }

  closeModal(result?: any) {
    this.activeModal.close(result);
    this.registerForm.reset();
  }

  get fields() {
    return this.registerForm.controls;
  }

  validate(inputName: string) {
    const touched = this.fields[inputName].touched;
    const validInput = this.fields[inputName].valid;

    return {
      'is-valid': validInput && touched,
      'is-invalid': !validInput && touched,
    };
  }

  private passwordsShouldMatch(fGroup: FormGroup) {
    const samePassword =
      fGroup.controls.password.value === fGroup.controls.confirmPassword.value;

    return samePassword ? null : { mismatch: true };
  }

  checkPasswords() {
    const { confirmPassword } = this.fields;
    const touched = confirmPassword.touched;

    if (confirmPassword.invalid && touched) return { 'is-invalid': true };

    const mismatch = this.passwordsShouldMatch(this.registerForm);

    return {
      'is-valid': !mismatch && touched,
      'is-invalid': mismatch && touched,
    };
  }
}
