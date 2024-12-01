import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret:process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {expiresIn: '1w'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
