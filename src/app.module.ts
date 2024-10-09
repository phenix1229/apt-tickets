import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { TicketSchema } from './schemas/ticket.schema';
import { config } from './config';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsService } from './tickets/tickets.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UsersModule, 
            MongooseModule.forRootAsync({
              inject: [ConfigService], 
              useFactory: async (configSecret: ConfigService) => ({
                uri: configSecret.get("MONGO_URI")
              })
            }),
            MongooseModule.forFeature([{
              name: 'User', schema: UserSchema
            }]),
            MongooseModule.forFeature([{
              name: 'Ticket', schema: TicketSchema
            }]),
            ConfigModule.forRoot({
              isGlobal: true, 
              load: [config]
            }),
            TicketsModule,
            MailModule,
            AuthModule
          ],
  controllers: [AppController],
  providers: [AppService, UsersService, TicketsService, MailService, AuthService],
})
export class AppModule {}
