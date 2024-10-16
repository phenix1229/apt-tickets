import { UserStatus, Department } from "src/schemas/user.schema";

export interface JwtPayload {
    isAdmin: boolean;

    isStaff: boolean;

    firstName: string;

    lastName: string;

    email: string;

    userStatus: UserStatus

    phoneNumber?: string;

    cellNumber?: string;

    unit?: string;

    department?: Department;
}