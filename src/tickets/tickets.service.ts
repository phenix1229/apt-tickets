import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/schemas/ticket.schema';
import { timeFormat, dateFormat } from 'src/utils/utilities';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class TicketsService {
  constructor(@InjectModel('Ticket') private ticketModel: Model<TicketDocument>, private mailService: MailService) {}

  async create(
    // createTicketDto: CreateTicketDto, 
    request: any): Promise<Ticket> {
    const createTicketDto = {
    openedBy:request.openedBy,
    clientName:request.clientName,
    clientPhone: request.clientPhone,
    clientCell: request.clientCell,
    clientEmail: request.clientEmail,
    clientLocation: request.clientLocation,
    description: request.description,
    assignedDepartment: request.assignedDepartment,
    updateComments: [],
    }
    const ticket = await new this.ticketModel(createTicketDto).save();
    const emailDto = { 
      sender:request.sender, 
      recipient:request.clientEmail, 
      subject:`New Ticket (${ticket._id})`, 
      text:`Ticket ${ticket._id} was created for you on ${dateFormat()}.`
    };
    this.mailService.sendEmail(emailDto);
    // return createTicketDto;
    return ticket;
  }

  async getAllTickets() {
    return this.ticketModel.find();
  }

  async getTicketById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById( {_id: id} );
    if(!ticket){
      throw new NotFoundException();
    }
    return ticket;
  }

  updateTicket(id: string, updateTicketDto: UpdateTicketDto){
    return this.ticketModel.updateOne({_id: id}, {$set: {...updateTicketDto}})
  }

  updateComments(id: string, request: any){
    const {firstName, lastName, comment} = request;
    const ticketUpdate = {
      "updateDate": `${dateFormat()}`,
      "updateTime": `${timeFormat()}`,
      "updatedBy": `${firstName} ${lastName}`,
      comment
    }
    this.ticketModel.findById({_id: id}).then(
      (ticket) => {ticket.updateComments.push(ticketUpdate);
        if(request.ticketStatus){
          ticket.ticketStatus = request.ticketStatus;
        }
      ticket.save();
      }
    )
    return this.ticketModel.findById({_id: id});
  }
}
