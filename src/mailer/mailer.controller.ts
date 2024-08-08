import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './mailer.service';
import { Email } from './email.entity';
import { CreateMailDto } from './dto/create-mail.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('email')
@ApiTags("Email")
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('save')
  async saveEmail(
    @Body() emailData: CreateMailDto
  ) {

    return this.emailService.saveEmail(emailData);
  }
}
