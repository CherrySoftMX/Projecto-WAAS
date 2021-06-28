import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  /**
   * Envía un email al destinatario especificado.
   *
   * @param to El destinatario del email.
   * @param body El contenido del email.
   */
  async sendEmail(to: string, body: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to GAMERPOT',
      html: `<i>${body}</i><br><p>Thanks for your message, We'll read it ASAP</p>`,
    });
  }
}
