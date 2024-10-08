import { IsEmail, IsNotEmpty, IsOptional, IsArray, IsString, IsPhoneNumber, IsEnum } from "class-validator"
import { Department, UserStatus } from "src/schemas/user.schema"
import { dateFormat } from "src/utils/utilities"

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    openedBy: string;

    @IsNotEmpty()
    @IsString()
    openDate: string = `${dateFormat()}`;

    @IsNotEmpty()
    @IsString()
    clientName: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    clientPhone: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    clientCell: string;

    @IsNotEmpty()
    @IsEmail()
    clientEmail: string;

    @IsNotEmpty()
    @IsString()
    clientLocation: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(Department)
    assignedDepartment: Department;

    @IsNotEmpty()
    @IsEnum(UserStatus)
    ticketStatus: UserStatus = UserStatus.ACTIVE;
    
    @IsOptional()
    @IsArray()
    updateComments?: [Object];
}
