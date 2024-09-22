import { Body, Controller, Get, Post, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':email')
    findOne(@Param('email') email: string){
        return this.usersService.getUserById(email);
    }

    @Put(':email')
    update(@Param('email')  email: string, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.updateUser(email, updateUserDto)
    }

}
