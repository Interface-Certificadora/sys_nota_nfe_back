import { HttpException, Injectable } from '@nestjs/common';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';
import { ErrorParceiroEntity } from './entities/error-parceiro.entity';
import { Parceiro } from './entities/parceiro.entity';
import { PrismaService } from '../../prisma/prisma.service';

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

      return await this.prismaService.parceiros.create({
        data,
      });
    } catch (error) {
      const retorno: ErrorParceiroEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  findAll() {
    return `This action returns all parceiro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parceiro`;
  }

  update(id: number, updateParceiroDto: UpdateParceiroDto) {
    return `This action updates a #${id} parceiro`;
  }

  remove(id: number) {
    return `This action removes a #${id} parceiro`;
  }
}
