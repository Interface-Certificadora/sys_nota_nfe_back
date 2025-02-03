import { HttpException, Injectable } from '@nestjs/common';
import { UserLogin } from './dto/user.login.dto';
import { ErrorLoginEntity } from './entities/Error.login.entity';
import { Login } from './entities/login.entity';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private prismasService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(dados: UserLogin): Promise<Login | ErrorLoginEntity> {
    try {
      const UsuarioExist = await this.GetUser(dados.email);

      if (!UsuarioExist) {
        const retorno: ErrorLoginEntity = {
          message: 'Usuário e senha incorretos',
        };
        throw new HttpException(retorno, 400);
      }

      const isValid = bcrypt.compareSync(dados.password, UsuarioExist.password);

      if (!isValid) {
        const retorno: ErrorLoginEntity = {
          message: 'Usuário e senha incorretos',
        };
        throw new HttpException(retorno, 400);
      }

      if (!UsuarioExist.status) {
        const retorno: ErrorLoginEntity = {
          message: 'Usuário e senha incorretos',
        };
        throw new HttpException(retorno, 400);
      }

      const Pyload = {
        id: UsuarioExist.id,
        name: UsuarioExist.name,
        email: UsuarioExist.email,
      };

      const data: Login = {
        user: {
          id: UsuarioExist.id,
          name: UsuarioExist.name,
          email: UsuarioExist.email,
        },
        token: this.jwtService.sign(Pyload),
      };
      return data;
    } catch (error) {
      const retorno: ErrorLoginEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  //____________________________________________________________________________________

  async GetUser(email: string) {
    try {
      const UsuarioExist = await this.prismasService.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!UsuarioExist) {
        return null;
      }
      return UsuarioExist;
    } catch (error) {
      return null;
    }
  }
}
