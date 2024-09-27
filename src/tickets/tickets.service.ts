import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(@InjectModel('Ticket') private ticketModel: Model<TicketDocument>) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    new this.ticketModel(createTicketDto).save();
    return createTicketDto;
  }

  async getAllTickets() {
    return this.ticketModel.find();
  }

  getTicketById(id: string) {
    return this.ticketModel.find( {_id: id} );
  }

  updateTicket(id: string, updateTicketDto: UpdateTicketDto){
    return this.ticketModel.updateOne({_id: id}, {$set: {...updateTicketDto}})
  }

  updateComments(id: string, request: any){
    const {firstName, lastName, comment} = request;
    const date = new Date();
    const minuteFormat = () => {
      if (date.getMinutes() < 10){
        return `0${date.getMinutes()}`;
      } else {
        return `${date.getMinutes()}`;
      }
    }
    const ticketUpdate = {
      "updateDate": `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`,
      "updateTime": `${date.getHours()}:${minuteFormat()}`,
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
