import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Department, UserStatus } from './user.schema';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
    @Prop()
    openedBy: string

    @Prop()
    openDate: string

    @Prop()
    clientName: string

    @Prop()
    clientPhone: string

    @Prop()
    clientCell: string

    @Prop()
    clientEmail: string

    @Prop()
    clientLocation: string

    @Prop()
    description: string

    @Prop()
    assignedDepartment: Department

    @Prop([Object])
    updateComments: Object[]

    @Prop()
    ticketStatus: UserStatus
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);