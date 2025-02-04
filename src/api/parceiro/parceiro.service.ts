import { HttpException, Injectable } from '@nestjs/common';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';
import { ErrorParceiroEntity } from './entities/error-parceiro.entity';
import { Parceiro } from './entities/parceiro.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { ParceiroDeleteEntity } from './entities/parceiro.delete.entity';

@Injectable()
export class ParceiroService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    data: CreateParceiroDto,
  ): Promise<Parceiro | ErrorParceiroEntity> {
    try {
      const consulta = await this.prismaService.parceiros.findUnique({
        where: {
          cpf: data.cpf,
        },
      });

      if (consulta) {
        const retorno: ErrorParceiroEntity = {
          message: 'Parceiro ja cadastrado',
        };
        throw new HttpException(retorno, 400);
      }

      const req = await this.prismaService.parceiros.create({
        data,
      });

      return plainToClass(Parceiro, req);
    } catch (error) {
      const retorno: ErrorParceiroEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findAll(): Promise<Parceiro[] | ErrorParceiroEntity> {
    try {
      const req = await this.prismaService.parceiros.findMany({
        where: {
          status: true,
        },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          whatsapp: true,
        },
      });

      return req.map((i: any) => plainToClass(Parceiro, i));
    } catch (error) {
      const retorno: ErrorParceiroEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  findOne(id: number) {
    try {
      const req = this.prismaService.parceiros.findUnique({
        where: {
          id,
        },
      });

      return plainToClass(Parceiro, req);
    } catch (error) {
      const retorno: ErrorParceiroEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async update(id: number, updateParceiroDto: UpdateParceiroDto) {
    try {
      const req = await this.prismaService.parceiros.update({
        where: {
          id,
        },
        data: updateParceiroDto,
      });

      return plainToClass(Parceiro, req);
    } catch (error) {
      const retorno: ErrorParceiroEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async remove(
    id: number,
  ): Promise<ParceiroDeleteEntity | ErrorParceiroEntity> {
    try {
      const isdisbled = await this.prismaService.parceiros.findUnique({
        where: {
          id,
        },
      });

      if (!isdisbled.status) {
        return { message: 'Parceiro ja desativado' };
      }

      await this.prismaService.parceiros.update({
        where: {
          id,
        },
        data: {
          status: false,
        },
      });

      return { message: 'Parceiro desativado com sucesso' };
    } catch (error) {
      const retorno: ErrorParceiroEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }
}
