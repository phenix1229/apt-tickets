import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    isAdmin: boolean;

    @Prop()
    isStaff: boolean;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    unit?: string;

    @Prop()
    department?: Department;

    @Prop()
    phoneNumber: string;

    @Prop()
    cellNumber: string;

    @Prop()
    email: string;

    @Prop()
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

export const UserSchema = SchemaFactory.createForClass(User);
