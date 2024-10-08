import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    public sendEmail(to:string, subject:string, text:string): void {
        this.mailerService.sendMail({
            from: 'Ticket Service <no-reply@ticketservice.com>',
            to,
            subject,
            text
        })
        return;
    }
}
