import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserStatus, Department } from "../../schemas/user.schema";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    password: string;

    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isStaff: boolean;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(UserStatus)
    userStatus: UserStatus = UserStatus.ACTIVE;

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber?: string;

    @IsOptional()
    @IsPhoneNumber()
    cellNumber?: string;

    @IsOptional()
    @IsString()
    unit?: string;

    @IsOptional()
    @IsEnum(Department)
    department?: Department;
}