import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css'],
})
export class ForgotPasswordFormComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  data = new FormGroup({
    email: new FormControl('', [Validators.email]),
  });
  ngOnInit(): void {}

  sendMessage() {
    alert('message sent');
    this.activeModal.close();
  }

  validate() {
    let clases = {
      'is-valid':
        this.data.controls['email'].valid &&
        this.data.controls['email'].touched,
      'is-invalid':
        this.data.controls['email'].invalid &&
        this.data.controls['email'].touched,
    };
    return clases;
  }
}
