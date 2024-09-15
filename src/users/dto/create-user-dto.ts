import { UserStatus, Department } from "../user.model";

export class CreateUserDto {
    id: string;
    isAdmin: boolean;
    isStaff: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cellNumber: string;
    email: string;
    userStatus: UserStatus;
    unit?: string;
    department?: Department;
}