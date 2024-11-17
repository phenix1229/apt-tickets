import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    public sendEmail(to:string, subject:string, text:string): void {
        this.mailerService.sendMail({
            from: 'Paul Garay <pgaray1229@yahoo.com>',
            to,
            subject,
            text
        })
        return;
    }
}
