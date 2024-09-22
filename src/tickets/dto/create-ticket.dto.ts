import { Department, TicketStatus } from "src/schemas/ticket.schema";

export class CreateTicketDto {
    openedBy: string
    openDate: string
    clentName: string
    clientPhone: string
    clientCell: string
    clientEmail: string
    clientLocation: string
    description: string
    assignedDepartment: Department
    updateComments: string
    ticketStatus: TicketStatus.OPEN
}
