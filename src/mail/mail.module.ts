import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
            host: configService.get('MAIL_HOST'),
            port: 587,
            service:'Yahoo',
            secure: false,
            tls: {
                requireTLS: true,
                ciphers:'SSLv3'
            },
          auth: {
            user: configService.get('SMTP_USERNAME'),
            pass: configService.get('SMTP_PASSWORD')
          }
        },
        default: {
          from: 'TicketService <no-reply@ticketservice.com>'
        }
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
