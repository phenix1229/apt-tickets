import { Controller, Get, Post, Body, Put, Param, Patch, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tickets')
// @UseGuards(AuthGuard())
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @Get()
  async getAllTickets() {
    return await this.ticketsService.getAllTickets();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ticketsService.getTicketById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return await this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Patch(':id')
  async updateComments(@Param('id') id:string, @Body() request:any){
    return await this.ticketsService.updateComments(id, request);
  }
}
