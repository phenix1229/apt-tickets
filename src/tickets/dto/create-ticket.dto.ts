import { Department, UserStatus } from "src/schemas/user.schema"
import { IsEmail, IsNotEmpty, IsOptional, IsArray, IsString, IsPhoneNumber, IsEnum } from "class-validator"

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    openedBy: string

    @IsNotEmpty()
    @IsString()
    openDate: string

    @IsNotEmpty()
    @IsString()
    clientName: string

    @IsNotEmpty()
    @IsPhoneNumber()
    clientPhone: string

    @IsNotEmpty()
    @IsPhoneNumber()
    clientCell: string

    @IsNotEmpty()
    @IsEmail()
    clientEmail: string

    @IsNotEmpty()
    @IsString()
    clientLocation: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsEnum(Department)
    assignedDepartment: Department

    @IsOptional()
    @IsArray()
    updateComments: [Object]

    @IsNotEmpty()
    @IsEnum(UserStatus)
    ticketStatus: UserStatus
}
