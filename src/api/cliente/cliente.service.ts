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
      console.log(dados);
      const rest = await this.prismaService.client.create({
        data: dados,
      });
      const data = {
        ...rest,
        cnpj: formatarCNPJ(rest.cnpj),
        telefone: MascTel(rest.telefone),
        telefone2: MascTel(rest.telefone2),
        tel_contador: MascTel(rest.tel_contador),
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
