import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { User, UserDocument} from '../schemas/user.schema';
import { MailService } from 'src/mail/mail.service';
import { dateFormat } from 'src/utils/utilities';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, private mailService: MailService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        if(await this.userModel.findOne({email:createUserDto.email})){
            throw new ConflictException('This username/email already exists.');
        }
        const user = await new this.userModel(createUserDto).save();
        this.mailService.sendEmail(user.email,`New Account (${user._id})`,`Account ${user._id} was created for you on ${dateFormat()}.`);
        return createUserDto;
    }

    async getAllUsers() {
        return this.userModel.find();
    }

    getUserById(email: string) {
        return this.userModel.find( {email} );
    }

    async updateUser(email: string, updateUserDto: UpdateUserDto){
        const user = await this.userModel.updateOne({email}, {$set: {...updateUserDto}});
        this.mailService.sendEmail(email,`Changes to User Account`,`Changes to account with username: ${email} were made on ${dateFormat()}.`);
        return user;
    }
}
