import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserStatus, Department } from "../../schemas/user.schema";

export class CreateUserDto {
    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isStaff: boolean;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    cellNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(UserStatus)
    userStatus: UserStatus;

    @IsOptional()
    @IsString()
    unit?: string;

    @IsOptional()
    @IsEnum(Department)
    department?: Department;
}