import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  to: string = '';
  body: string = '';

  @Output() onSendEmail = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  sendEmail() {
    this.onSendEmail.emit({ to: this.to, body: this.body });
    this.to = '';
    this.body = '';
  }
}
