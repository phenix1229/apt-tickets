import { BadRequestException, ConflictException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { User, UserDocument} from '../schemas/user.schema';
import { MailService } from 'src/mail/mail.service';
import { dateFormat } from 'src/utils/utilities';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, private mailService: MailService, private jwtService: JwtService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        if(await this.userModel.findOne({email:createUserDto.email})){
            throw new ConflictException('This username/email already exists.');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hashedPassword;
        const user = await new this.userModel(createUserDto).save();
        this.mailService.sendEmail(user.email,`New Account (${user._id})`,`Account ${user._id} was created for you on ${dateFormat()}.`);
        return createUserDto;
    }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async getUserById(email: string): Promise<User> {
        return await this.userModel.findOne( {email} );
    }

    async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<User>{
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new NotFoundException('User does not exist.');
        }
        const updatedUser = await this.userModel.updateOne({email}, {$set: {...updateUserDto}});
        this.mailService.sendEmail(email,`Changes to User Account`,`Changes to account with username: ${email} were made on ${dateFormat()}.`);
        return user;
    }

    async login(email: string, password: string){
        const user = await this.userModel.findOne({email});
        if(!user || !await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Invalid credentials.')
        }
        const accessToken = await this.jwtService.signAsync({
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            cellNumber: user.cellNumber,
            email: user.email,
            unit: user.unit,
            department: user.department
        }, {expiresIn: '30s'});
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
        // res.cookie('refreshToken', refreshToken,{
        //     httpOnly: true,
        //     maxAge: 7*24*60*60*1000
        // })

        return {token:accessToken};
    }
}
