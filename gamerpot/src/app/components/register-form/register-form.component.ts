import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  pswdRegex = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}';

  registerData = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.pattern(this.pswdRegex),
      Validators.required,
    ]),
    rptPassword: new FormControl('', [Validators.required]),
  });

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  register() {
    alert(this.registerData.get('name')?.value);
    //register user

    //if ok
    this.activeModal.close();
  }

  validate(nameInput: string) {
    let classes = {
      'is-valid':
        this.registerData.get(nameInput)?.valid &&
        this.registerData.get(nameInput)?.touched,
      'is-invalid':
        this.registerData.get(nameInput)?.invalid &&
        this.registerData.get(nameInput)?.touched,
    };

    return classes;
  }

  validatePasswords() {
    const touched = this.registerData.controls['rptPassword'].value;
    const valid =
      this.registerData.controls['rptPassword'].value ==
      this.registerData.controls['password'].value;

    let classes = {
      'is-valid': valid && touched,
      'is-invalid': !valid && touched,
    };

    return classes;
  }
}
