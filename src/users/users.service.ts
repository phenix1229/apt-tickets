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
        // return user.save();
        // {
            // isAdmin,
            // isStaff,
            // firstName,
            // lastName,
            // phoneNumber,
            // cellNumber,
            // email,
            // userStatus,
            // unit,
            // department

        // } = createUserDto;
    }

    //     const user: User = {
    //         isAdmin,
    //         isStaff,
    //         firstName,
    //         lastName,
    //         phoneNumber,
    //         cellNumber,
    //         email,
    //         userStatus: UserStatus.ACTIVE,
    //         unit,
    //         department
    //     };
    //     return user;
    // }

    getAllUsers() {
    }

    getUserById() {
        
    }
}
