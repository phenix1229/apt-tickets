import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { SendEmailDto } from './dto/send_email.dto';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService, private readonly config: ConfigService) {}
    
    public sendEmail(dto): void {
        const { sender, recipient, subject, text } = dto;
        this.mailerService.sendMail({
            from: sender,
            to: recipient,
            subject,
            text
        })
        return;
    }
}
