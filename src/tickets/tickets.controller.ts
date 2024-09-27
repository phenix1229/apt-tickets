import { Controller, Get, Post, Body, Put, Param, Patch } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
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
