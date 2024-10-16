import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';

const secretWord = 
{
  inject: [ConfigService], 
  useFactory: 
  async (configSecret: ConfigService) => ({
    secret: configSecret.get("SECRET")
  })
}

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:`${secretWord}`,
      signOptions:{
        expiresIn:3600
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
