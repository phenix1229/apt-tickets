import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService){}

  async signIn(email: string, password: string) {
    const user = await this.usersService.getUserById(email);
    if(!user || !await bcrypt.compare(password, user.password)){
      throw new UnauthorizedException('Invalid credentials.')
    }
    const payload = {
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      cellNumber: user.cellNumber,
      email: user.email,
      unit: user.unit,
      department: user.department
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
