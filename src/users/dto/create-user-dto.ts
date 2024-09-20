import { UserStatus, Department } from "../../schemas/user.schema";

export class CreateUserDto {
    isAdmin: boolean;
    isStaff: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cellNumber: string;
    email: string;
    userStatus: UserStatus.ACTIVE;
    unit?: string;
    department?: Department;
}