import { Controller, Get, Post, Body, Put, Param, Patch, UseGuards, Query, HttpStatus, Res, NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/schemas/user.schema';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles(Role.ADMIN,Role.RESIDENT)
  async createTicket(@Res() res, @Body() createTicketDto: CreateTicketDto) {
    const newTicket = await this.ticketsService.create(createTicketDto);
    return res.status(HttpStatus.OK).json({
      message: 'Ticket created successfully.',
      ticket: newTicket
    });
  }

  @Get('all')
  @Roles(Role.ADMIN)
  async getAllTickets(@Res() res) {
    const tickets = await this.ticketsService.getAllTickets();
    return res.status(HttpStatus.OK).json(tickets);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(@Res() res, @Param('id') id: string) {
    const ticket = await this.ticketsService.getTicketById(id);
    if(!ticket){
      throw new NotFoundException('Ticket does not exist.');
    }
    return res.status(HttpStatus.OK).json(ticket)
  }

  @Put(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    const updatedTicket = await this.ticketsService.updateTicket(id, updateTicketDto);
    if(!updatedTicket){
      throw new NotFoundException('Ticket does not exist.');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Ticket updated successfully.',
      ticket: updatedTicket
    });
  }

  @Patch(':id')
  async updateComments(@Res() res, @Param('id') id:string, @Body() request:any){
    const updatedTicket = await this.ticketsService.updateComments(id, request);
    if(!updatedTicket){
      throw new NotFoundException('Ticket does not exist.');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Ticket updated successfully.',
      ticket: updatedTicket
    });
  }
}
