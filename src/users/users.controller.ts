import { Body, Controller, Get, Post, Param, Put, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService, private jwtService:JwtService){}

    @Post()
    async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.createUser(createUserDto);
        return res.status(HttpStatus.OK).json({
            message: 'User created successfully.',
            user: newUser
        });
    }

    @Get()
    async getAllUsers(@Res() res) {
        const users = await this.usersService.getAllUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':email')
    async findOne(@Res() res, @Param('email') email: string){
        const user = await this.usersService.getUserById(email);
        if(!user){
            throw new NotFoundException('User does not exist.');
        }
        return res.status(HttpStatus.OK).json(user)
    }

    @Put(':email')
    async update(@Res() res, @Param('email')  email: string, @Body() updateUserDto: UpdateUserDto){
        const updatedUser = await this.usersService.updateUser(email, updateUserDto);
        // if(!updatedUser){
        //     throw new NotFoundException('Ticket does not exist.');
        // }
        return res.status(HttpStatus.OK).json({
        message: 'User updated successfully.',
        user: updatedUser
        });
    }

    @Post('/login')
    // async login(@Res({passthrough: true}) res, @Body('email') email:string, @Body('password') password:string){
    async login(@Body('email') email:string, @Body('password') password:string){
        // res.cookie('refreshToken', refreshToken,{
        //     httpOnly: true,
        //     maxAge: 7*24*60*60*1000
        // })
        return await this.usersService.login(email, password)
    }

}
