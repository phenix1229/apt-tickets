import { Body, Controller, Get, Post } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getAllUsers(): User[] {
        return this.usersService.getAllUsers();
    }
}
