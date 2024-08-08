import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './email.entity';
import { EmailService } from './mailer.service';
import { EmailController } from './mailer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class MailerModule {}
