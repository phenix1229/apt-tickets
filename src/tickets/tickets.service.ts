import { Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/schemas/ticket.schema';
import { User } from 'src/schemas/user.schema';
import { timeFormat, dateFormat } from 'src/utils/utilities';
import { MailService } from 'src/mail/mail.service';
import { request } from 'https';

@Injectable()
export class TicketsService {
  constructor(@InjectModel('Ticket') private ticketModel: Model<TicketDocument>, private mailService: MailService) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    
    // console.log(`user = `)
    // if(user.isStaff === true){
    //   throw new UnauthorizedException('You are not authorized to perform this action.')
    // }
    const ticket = await new this.ticketModel(createTicketDto).save();
    // this.mailService.sendEmail(ticket.clientEmail,`New Ticket (${ticket._id})`,`Ticket ${ticket._id} was created for you on ${dateFormat()}.`);
    return ticket;
  }

  async getAllTickets(): Promise<Ticket[]> {
    return await this.ticketModel.find();
  }

  async getTicketById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById( {_id: id} );
    // if(!ticket){
    //   throw new NotFoundException();
    // }
    return ticket;
  }

  async updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket>{
    await this.ticketModel.updateOne({_id: id}, {$set: {...updateTicketDto}});
    const ticket = await this.ticketModel.findById( {_id: id} );
    // this.mailService.sendEmail(ticket.clientEmail,`Changes to Ticket (${ticket._id})`,`Changes to ticket ${ticket._id} were made on ${dateFormat()}.`);
    return ticket;
  }

  async updateComments(id: string, request: any): Promise<Ticket>{
    const {firstName, lastName, comment} = request;
    const ticketUpdate = {
      "updateDate": `${dateFormat()}`,
      "updateTime": `${timeFormat()}`,
      "updatedBy": `${firstName} ${lastName}`,
      comment
    }
    await this.ticketModel.findById({_id: id}).then(
      (ticket) => {ticket.updateComments.push(ticketUpdate);
        if(request.ticketStatus){
          ticket.ticketStatus = request.ticketStatus;
        }
      ticket.save();
      // this.mailService.sendEmail(ticket.clientEmail,`Changes to Ticket (${ticket._id})`,`Changes to ticket ${ticket._id} were made on ${dateFormat()}.`);
      }
    )
    return await this.ticketModel.findById({_id: id});
  }
}
