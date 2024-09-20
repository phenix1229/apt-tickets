import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { config } from './config';

@Module({
  imports: [UsersModule, 
            MongooseModule.forRootAsync({
              inject: [ConfigService], 
              useFactory: async (configSecret: ConfigService) => ({
                uri: configSecret.get("MONGO_URI")
              })
            }),
            MongooseModule.forFeature([{
              name: 'User', schema: UserSchema
            }]),
            ConfigModule.forRoot({
              isGlobal: true, 
              load: [config]
            })
          ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
