import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginGuard } from '../login/login.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ErrorUserEntity } from './entities/erro.user.entity';

@UseGuards(LoginGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Listagem de usuários',
    type: [User],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado',
    type: ErrorUserEntity,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'dados do Usuário',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorUserEntity,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorUserEntity,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Usuário removido',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorUserEntity,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch('reset/:id')
  @ApiResponse({
    status: 201,
    description: 'Reset de senha para o padrão 1234',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorUserEntity,
  })
  reset(@Param('id') id: string) {
    return this.userService.findResetPassword(+id);
  }
}
