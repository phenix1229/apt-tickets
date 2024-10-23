import { Injectable, Render, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>, private jwtService: JwtService){};

  async signIn(authCredentialsDto: AuthCredentialsDto){
    const {email, password} = authCredentialsDto;
    const user = await this.userModel.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
      if(user.userStatus === 'Active'){
        const payload = {
          user: {
            isAdmin: user.isAdmin,
            isStaff: user.isStaff,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            cellNumber: user.cellNumber,
            email: user.email,
            unit: user.unit,
            department: user.department
          }
        };
        const accessToken: string = await this.jwtService.sign(payload)
        console.log(payload);
        return {accessToken};
      } else {
        throw new UnauthorizedException('This user account is no longer active.')
      }
    } else {
      throw new UnauthorizedException('Please check your login credentials.')
    }
  }

  async adminHome(){
    return {}
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
