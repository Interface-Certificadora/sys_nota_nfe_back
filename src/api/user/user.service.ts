import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorUserEntity } from './entities/erro.user.entity';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dados: CreateUserDto): Promise<User | ErrorUserEntity> {
    try {
      const UsuarioExist = await this.prismaService.user.findFirst({
        where: {
          email: dados.email,
        },
      });

      if (UsuarioExist) {
        const retorno: ErrorUserEntity = {
          message: 'Email ja cadastrado',
        };
        throw retorno;
      }

      const req = await this.prismaService.user.create({
        data: {
          name: dados.name.toUpperCase(),
          email: dados.email,
          password: this.generateHash(dados.password),
          senha: dados.password,
          status: true,
        },
      });

      const data: User = {
        id: req.id,
        name: req.name,
        email: req.email,
        status: req.status,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
      };

      return data;
    } catch (error) {
      const retorno: ErrorUserEntity = {
        message: error.message,
      };
      throw retorno;
    }
  }

  async findAll(): Promise<User[] | ErrorUserEntity> {
    try {
      const req = await this.prismaService.user.findMany();
      const data: User[] = req.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
          email: i.email,
          status: i.status,
          createdAt: i.createdAt,
          updatedAt: i.updatedAt,
        };
      });
      return data;
    } catch (error) {
      const retorno: ErrorUserEntity = {
        message: error.message,
      };
      throw retorno;
    }
  }

  async findOne(id: number): Promise<User | ErrorUserEntity> {
    try {
      const req = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });

      const data: User = {
        id: req.id,
        name: req.name,
        email: req.email,
        status: req.status,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
      };

      return data;
    } catch (error) {
      const retorno: ErrorUserEntity = {
        message: error.message,
      };
      throw retorno;
    }
  }

  async update(
    id: number,
    dados: UpdateUserDto,
  ): Promise<User | ErrorUserEntity> {
    try {
      await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          name: dados.name,
          email: dados.email,
          status: dados.status,
        },
      });

      const req = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });

      const data: User = {
        id: req.id,
        name: req.name,
        email: req.email,
        status: req.status,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
      };

      return data;
    } catch (error) {
      const retorno: ErrorUserEntity = {
        message: error.message,
      };
      throw retorno;
    }
  }

  async remove(id: number): Promise<User | ErrorUserEntity> {
    try {
      await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      const req = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });

      const data: User = {
        id: req.id,
        name: req.name,
        email: req.email,
        status: req.status,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
      };

      return data;
    } catch (error) {
      const retorno: ErrorUserEntity = {
        message: error.message,
      };
      throw retorno;
    }
  }

  //--------------------------------------------------------------------------

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
