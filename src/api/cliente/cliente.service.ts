import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ErroClienteEntity } from './entities/error.cliente.entity';
import { Cliente } from './entities/cliente.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatarCNPJ } from 'src/function/cnpj';
import { MascTel } from 'src/function/tel';

@Injectable()
export class ClienteService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dados: CreateClienteDto): Promise<Cliente | ErroClienteEntity> {
    try {
      await this.prismaService.client.create({
        data: dados,
      });

      const req = await this.prismaService.client.findFirst({
        where: {
          cnpj: dados.cnpj,
          ie: dados.ie,
          cliente: dados.cliente,
          status: true,
        },
      });
      const data = {
        ...req,
        cnpj: formatarCNPJ(req.cnpj),
        telefone: MascTel(req.telefone),
        telefone2: MascTel(req.telefone2),
        tel_contador: MascTel(req.tel_contador),
      };
      return data;
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw retorno;
    }
  }

  async findAll(): Promise<Cliente[] | ErroClienteEntity> {
    try {
      const req = await this.prismaService.client.findMany();
      const data = req.map((i: any) => {
        return {
          ...i,
          cnpj: formatarCNPJ(i.cnpj),
          telefone: MascTel(i.telefone),
          telefone2: MascTel(i.telefone2),
          tel_contador: MascTel(i.tel_contador),
        };
      });
      return data;
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw retorno;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, dados: UpdateClienteDto) {
    console.log(dados);
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
