import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Email } from './email.entity';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'shafiq.siddiq@xevensolutions.com', // Replace with your email
        pass: 'Shafiq@7071', // Replace with your email password
      },
    });
  }

  async saveEmail(emailData: CreateMailDto) {
    const email = this.emailRepository.create(emailData);
    const savedEmail = await this.emailRepository.save(email);
    await this.sendMail(emailData);
    return savedEmail;
  }

  async sendMail(emailData: CreateMailDto) {
    const mailOptions = {
      from: 'shafiq.siddiq@xevensolutions.com', // Replace with your email
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h1 style="color: red;">${emailData.subject}</h1>
            <p>${emailData.text}</p>
            <div style="padding: 10px; background-color: #f4f4f4; border: 3px solid pink;">
              ${emailData.html}
            </div>
          </body>
        </html>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
