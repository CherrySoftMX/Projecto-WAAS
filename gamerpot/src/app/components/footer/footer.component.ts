import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/_services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private emailService: EmailService) {}

  ngOnInit(): void {}

  sendEmail(context: any) {
    this.emailService.sendEmail(context.to, context.body);
    window.alert('Thanks for your message');
  }
}
