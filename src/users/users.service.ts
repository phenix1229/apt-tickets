import { Injectable } from '@nestjs/common';
import { User, UserDocument} from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        new this.userModel(createUserDto).save();
        return createUserDto;
    }

    async getAllUsers() {
        return this.userModel.find();
    }

    getUserById(email: string) {
        return this.userModel.find( {email} );
    }

    updateUser(email: string, updateUserDto: CreateUserDto){
        return this.userModel.updateOne({email}, {$set: {...updateUserDto}})
    }
}
