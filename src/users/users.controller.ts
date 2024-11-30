import { Body, Controller, Get, Post, Param, Put, Res, HttpStatus, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as express from 'express';
import { jwtConstants } from 'src/auth/constants';

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

    @Get('all')
    async getAllUsers(@Res() res) {
        const users = await this.usersService.getAllUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('authUser')
    async authUser(@Req() req:express.Request, @Res() res:express.Response){
        try{
            const accessToken = req.headers.authorization.replace('Bearer ','');
            const {email} = await this.jwtService.verifyAsync(accessToken);
            const user = await this.usersService.getUserById(email);
            const authUser = {
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                cellNumber: user.cellNumber,
                email: user.email,
                unit: user.unit,
                department: user.department
            }
            return res.status(HttpStatus.OK).json(authUser);
        } catch(e) {
            throw new UnauthorizedException();
        }

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
        return res.status(HttpStatus.OK).json({
        message: 'User updated successfully.',
        user: updatedUser
        });
    }

    @Post('login')
    async login(@Res({passthrough: true}) res:express.Response, @Body('email') email:string, @Body('password') password:string){
        const user = await this.usersService.login(email, password);
        const accessToken = await this.jwtService.signAsync({
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            cellNumber: user.cellNumber,
            email: user.email,
            unit: user.unit,
            department: user.department
        }, {secret:jwtConstants.secret,expiresIn: '60s'});
        const refreshToken = await this.jwtService.signAsync({
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            cellNumber: user.cellNumber,
            email: user.email,
            unit: user.unit,
            department: user.department
        });
        res.status(200);
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000
        })
        return {token:accessToken};
    }

    @Post('refresh')
    async refresh(@Req() req:express.Request, @Res() res:express.Response){
        try {
            const refreshToken = req.cookies['refreshToken'];
            const {email} = await this.jwtService.verifyAsync(refreshToken);
            const token = await this.jwtService.signAsync({email},{expiresIn:'30s'})
            return res.status(HttpStatus.OK).json({token});
        } catch(e) {
            throw new UnauthorizedException;
        }
    }

    @Post('logout')
    async logout(@Res({passthrough:true}) res:express.Response){
        return res.status(HttpStatus.OK).clearCookie('refreshToken').statusMessage = 'success';
    }

}
