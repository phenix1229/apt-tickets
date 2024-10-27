import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from 'src/schemas/ticket.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [MongooseModule.forFeature([{name: Ticket.name, schema: TicketSchema}]), AuthModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {method: RequestMethod.POST, path: '/tickets'},
      {method: RequestMethod.GET, path: '/tickets'},
      {method: RequestMethod.GET, path: '/tickets/:id'},
      {method: RequestMethod.PUT, path: '/tickets/:id'},
      {method: RequestMethod.PATCH, path: '/tickets/:id'}
    )
  }
}
