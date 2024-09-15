export interface User {
    id: string;
    isAdmin: boolean;
    isStaff: boolean;
    firstName: string;
    lastName: string;
    unit?: string;
    department?: Department;
    phoneNumber: string;
    cellNumber: string;
    email: string;
    userStatus: UserStatus;
}

export enum Department {
    PLUMBING = "PLUMBING",
    ELECTRICAL = "ELECTRICAL",
    STRUCTURAL = "STRUCTURAL"
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}