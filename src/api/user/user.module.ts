import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserControllerPublic } from './public/user.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController, UserControllerPublic],
  providers: [UserService],
})
export class UserModule {}
