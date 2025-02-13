import { HttpException, Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { ErrorEntity } from '../../entities/error.entity';
import { Pagamento } from './entities/pagamento.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { DeletePagamento } from './entities/delete.pagamento.entity';

@Injectable()
export class PagamentoService {
  constructor(private readonly prismaServer: PrismaService) {}

  async create(dados: CreatePagamentoDto): Promise<Pagamento | ErrorEntity> {
    try {
      const create = await this.prismaServer.pagamento.create({
        data: dados,
        include: {
          parceiro: true,
        },
      });
      return plainToClass(Pagamento, create);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findAll(): Promise<Pagamento[] | ErrorEntity> {
    try {
      const getAll = await this.prismaServer.pagamento.findMany({
        include: {
          parceiro: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
      return getAll.map((i: any) => plainToClass(Pagamento, i));
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findOne(id: number) {
    try {
      const req = await this.prismaServer.pagamento.findUnique({
        where: {
          id,
        },
        include: {
          parceiro: true,
        },
      });
      return plainToClass(Pagamento, req);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async update(
    id: number,
    dados: UpdatePagamentoDto,
  ): Promise<Pagamento | ErrorEntity> {
    try {
      const update = await this.prismaServer.pagamento.update({
        where: {
          id,
        },
        data: dados,
        include: {
          parceiro: true,
        },
      });
      return plainToClass(Pagamento, update);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async remove(id: number): Promise<DeletePagamento | ErrorEntity> {
    try {
      await this.prismaServer.pagamento.delete({
        where: {
          id,
        },
      });
      return { message: 'Pagamento removido com sucesso' };
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }
}
