import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
    @Prop()
    openedBy: string

    @Prop()
    openDate: string

    @Prop()
    clentName: string

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

    @Prop()
    updateComments: string

    @Prop()
    ticketStatus: TicketStatus
}

export enum Department {
    PLUMBING = "PLUMBING",
    ELECTRICAL = "ELECTRICAL",
    STRUCTURAL = "STRUCTURAL"
}

export enum TicketStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);