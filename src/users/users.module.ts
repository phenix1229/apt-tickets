import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {method: RequestMethod.POST, path: 'users'},
      {method: RequestMethod.GET, path: 'users'},
      {method: RequestMethod.GET, path: 'users/:id'},
      {method: RequestMethod.PUT, path: 'users'}
    )
  }
}
