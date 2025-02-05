import { HttpException, Injectable } from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { ErrorEntity } from 'src/entities/error.entity';
import { plainToClass } from 'class-transformer';
import { Cobranca } from './entities/cobranca.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { DeleteCobranca } from './entities/erro.cobranca.entity';

@Injectable()
export class CobrancaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateCobrancaDto): Promise<Cobranca | ErrorEntity> {
    try {
      const save = await this.prismaService.cobranca.create({
        data: {
          cliente_id: data.cliente_id,
          valor: data.valor,
          venc: data.venc,
          current: data.current,
          status: data.status,
          obs: data.obs,
          link_boleto: data.link_boleto,
        },
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
          valor: true,
          venc: true,
          current: true,
          status: true,
          obs: true,
          link_boleto: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return plainToClass(Cobranca, save);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findAll(): Promise<Cobranca[] | ErrorEntity> {
    try {
      const getAll = await this.prismaService.cobranca.findMany({
        where: {
          status: true,
        },
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
          valor: true,
          venc: true,
          current: true,
          status: true,
          obs: true,
          link_boleto: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return getAll.map((i: any) => plainToClass(Cobranca, i));
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findOne(id: number) {
    try {
      const req = await this.prismaService.cobranca.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
          valor: true,
          venc: true,
          current: true,
          status: true,
          obs: true,
          link_boleto: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return plainToClass(Cobranca, req);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async update(
    id: number,
    dados: UpdateCobrancaDto,
  ): Promise<Cobranca | ErrorEntity> {
    try {
      const update = await this.prismaService.cobranca.update({
        where: {
          id,
        },
        data: {
          cliente_id: dados.cliente_id,
          valor: dados.valor,
          venc: dados.venc,
          current: dados.current,
          status: dados.status,
          obs: dados.obs,
          link_boleto: dados.link_boleto,
        },
        include: {
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
        },
      });

      return plainToClass(Cobranca, update);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async remove(id: number): Promise<DeleteCobranca | ErrorEntity> {
    try {
      await this.prismaService.cobranca.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Cobrança removida com sucesso',
      };
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }
}
