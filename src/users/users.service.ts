import { Injectable } from '@nestjs/common';
import { User, UserStatus} from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
    private users: User[] = [];

    createUser(createUserDto: CreateUserDto): User {
        const {
            id,
            isAdmin,
            isStaff,
            firstName,
            lastName,
            phoneNumber,
            cellNumber,
            email,
            userStatus,
            unit,
            department
        } = createUserDto;

        const user: User = {
            id: uuid(),
            isAdmin,
            isStaff,
            firstName,
            lastName,
            phoneNumber,
            cellNumber,
            email,
            userStatus: UserStatus.ACTIVE,
            unit,
            department
        };
        this.users.push(user);
        return user;
    }

    getAllUsers() {
        return this.users;
    }
}
