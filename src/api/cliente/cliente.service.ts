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
      const isExist = await this.prismaService.client.findFirst({
        where: { cnpj: { contains: dados.cnpj } },
      });

      if (isExist) {
        const retorno: ErroClienteEntity = {
          message: 'CNPJ ja cadastrado',
        };
        throw new HttpException(retorno, 400);
      }

      let isWhatsapp1 = false;
      let isWhatsapp2 = false;
      const numeros = [
        dados.telefone ? `55${dados.telefone.replace(/\D/g, '')}` : null,
        dados.telefone2 ? `55${dados.telefone2.replace(/\D/g, '')}` : null,
      ].filter(Boolean);

      const isWhatsappExists = await this.isWhatsapp(numeros);

      if (isWhatsappExists.length > 0) {
        console.log(isWhatsappExists[0].exists);
        isWhatsapp1 = isWhatsappExists[0].exists;
        if (dados.telefone2) {
          isWhatsapp2 = isWhatsappExists[1].exists;
        }
      }

      const save = await this.prismaService.client.create({
        data: {
          ...dados,
          whatsapp: isWhatsapp1,
          ...(dados.telefone2 && { whatsapp2: isWhatsapp2 }),
        },
        include: {
          parceiro: true,
          cobrancas: true,
          certificates: true,
        },
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
        where: {
          status: true,
        },
        select: {
          id: true,
          razaoSocial: true,
          cliente: true,
          cnpj: true,
          telefone: true,
          status: true,
          parceiro: true,
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
        include: {
          parceiro: true,
          cobrancas: true,
          certificates: true,
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
        include: {
          parceiro: true,
          cobrancas: true,
          certificates: true,
        },
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

  //--------------------------------------------------------------------------

  async isWhatsapp(phones: string[]) {
    try {
      const req = await fetch(
        `${process.env.WHATSAPP_URL}/chat/whatsappNumbers/${process.env.WHATSAPP_INSTACE}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.WHATSAPP_KEY,
          },
          body: JSON.stringify({
            numbers: phones,
          }),
        },
      );
      const res = await req.json();
      if (res.length > 0) {
        return res;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
