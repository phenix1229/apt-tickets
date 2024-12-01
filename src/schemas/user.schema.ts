import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
    ADMIN = "Admin",
    STAFF = "Staff",
    RESIDENT = "Resident"
}

export enum Department {
    PLUMBING = "Plumbing",
    ELECTRICAL = "Electrical",
    STRUCTURAL = "Structural"
}

export enum UserStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}

@Schema()
export class User {
    @Prop()
    password: string;

    @Prop(Role)
    role: Role;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    unit?: string;

    @Prop()
    department?: Department;

    @Prop()
    phoneNumber?: string;

    @Prop()
    cellNumber?: string;

    @Prop()
    email: string;

    @Prop()
    userStatus: UserStatus;
}



export const UserSchema = SchemaFactory.createForClass(User);
