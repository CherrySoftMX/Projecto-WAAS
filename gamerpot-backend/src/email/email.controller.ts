import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/auth/utils/public-endpoint.decorator';
import { EmailService } from './email.service';
import { EmailRequest } from './request/email.request';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  sendEmail(@Body() request: EmailRequest) {
    return this.emailService.sendEmail(request.to, request.body);
  }
}
