import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorUserEntity } from '../entities/erro.user.entity';

@Controller('user')
export class UserControllerPublic {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Cadastra um novo usuário',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorUserEntity,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
