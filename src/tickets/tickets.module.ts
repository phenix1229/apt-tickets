import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from 'src/schemas/ticket.schema';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{name: Ticket.name, schema: TicketSchema}]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {expiresIn: '1w'}
    })
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})

export class TicketsModule {}
