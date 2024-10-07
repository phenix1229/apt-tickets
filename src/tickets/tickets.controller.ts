import { Controller, Get, Post, Body, Put, Param, Patch } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService, private mailService: MailService) {}

  @Post()
  createTicket(@Body()request: any) {
    return this.ticketsService.create(request);
  }

  @Get()
  getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.getTicketById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Patch(':id')
  updateComments(@Param('id') id:string, @Body() request:any){
    return this.ticketsService.updateComments(id, request);
  }
}
