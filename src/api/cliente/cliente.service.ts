import { HttpException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ErroClienteEntity } from './entities/error.cliente.entity';
import { Cliente } from './entities/cliente.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { DeleteClienteDto } from './dto/delete-cliente.dto';
import { ErrorEntity } from '../../entities/error.entity';

@Injectable()
export class ClienteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dados: CreateClienteDto): Promise<Cliente | ErroClienteEntity> {
    try {
      const save = await this.prismaService.client.create({
        data: dados,
      });

      return plainToClass(Cliente, save);
    } catch (error) {
      console.log(error);
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findAll(): Promise<Cliente[] | ErroClienteEntity> {
    try {
      const req = await this.prismaService.client.findMany({
        select: {
          id: true,
          razaoSocial: true,
          cliente: true,
          cnpj: true,
          telefone: true,
          status: true,
        },
      });
      return req.map((i: any) => plainToClass(Cliente, i));
    } catch (error) {
      console.log(error);
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findOne(id: number): Promise<Cliente | ErroClienteEntity> {
    try {
      const req = await this.prismaService.client.findUnique({
        where: {
          id,
        },
      });
      return plainToClass(Cliente, req);
    } catch (error) {
      if (error instanceof Error) {
        const retorno = {
          message: error.message.replace(/"/g, ''),
          statusCode: 400,
        };
        throw new HttpException(retorno, 400);
      } else {
        const retorno = {
          message: 'Erro desconhecido',
          statusCode: 400,
        };
        throw new HttpException(retorno, 400);
      }
    }
  }

  async update(
    id: number,
    dados: UpdateClienteDto,
  ): Promise<Cliente | ErroClienteEntity> {
    try {
      const save = await this.prismaService.client.update({
        where: {
          id,
        },
        data: dados,
      });
      return plainToClass(Cliente, save);
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async remove(id: number): Promise<DeleteClienteDto | ErrorEntity> {
    try {
      await this.prismaService.client.update({
        where: {
          id,
        },
        data: {
          status: false,
        },
      });
      return {
        status: 'OK',
        message: 'Cliente removido com sucesso',
      };
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }
}
