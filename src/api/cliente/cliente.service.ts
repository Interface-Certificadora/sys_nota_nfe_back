import { HttpException, Injectable } from '@nestjs/common';
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
  /**
   * Creates a new cliente record in the database.
   *
   * @param dados - An instance of CreateClienteDto containing the details of the cliente to be created.
   * @returns A promise that resolves to the created Cliente entity or an ErroClienteEntity if an error occurs.
   *
   * The function formats the CNPJ and phone numbers before returning the data.
   * In case of an error, it throws an HttpException with the error message.
   */

  async create(dados: CreateClienteDto): Promise<Cliente | ErroClienteEntity> {
    try {
      const save = await this.prismaService.client.create({
        data: dados,
      });

      const CNPJ = formatarCNPJ(save.cnpj ?? '');
      const TEL = MascTel(save.telefone ?? '');
      const TEL2 = MascTel(save.telefone2 ?? '');
      const TEL_CONT = MascTel(save.tel_contador ?? '');
      const data = {
        ...save,
        cnpj: CNPJ,
        telefone: TEL,
        telefone2: TEL2,
        tel_contador: TEL_CONT,
      };
      return await Promise.resolve(data);
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findAll(): Promise<Cliente[] | ErroClienteEntity> {
    try {
      const req = await this.prismaService.client.findMany();
      const data = req.map((i: any) => {
        return {
          ...i,
          cnpj: formatarCNPJ(i.cnpj ?? ''),
          telefone: MascTel(i.telefone ?? ''),
          telefone2: MascTel(i.telefone2 ?? ''),
          tel_contador: MascTel(i.tel_contador ?? ''),
        };
      });
      return data;
    } catch (error) {
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
      const CNPJ = formatarCNPJ(req.cnpj ?? '');
      const TEL = MascTel(req.telefone ?? '');
      const TEL2 = MascTel(req.telefone2 ?? '');
      const TEL_CONT = MascTel(req.tel_contador ?? '');
      return await Promise.resolve({
        ...req,
        cnpj: CNPJ,
        telefone: TEL,
        telefone2: TEL2,
        tel_contador: TEL_CONT,
      });
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
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

      const CNPJ = formatarCNPJ(save.cnpj ?? '');
      const TEL = MascTel(save.telefone ?? '');
      const TEL2 = MascTel(save.telefone2 ?? '');
      const TEL_CONT = MascTel(save.tel_contador ?? '');
      const data = {
        ...save,
        cnpj: CNPJ,
        telefone: TEL,
        telefone2: TEL2,
        tel_contador: TEL_CONT,
      };
      return await Promise.resolve(data);
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async remove(id: number) {
    try {
      const save = await this.prismaService.client.update({
        where: {
          id,
        },
        data: {
          status: false,
        },
      });

      const CNPJ = formatarCNPJ(save.cnpj ?? '');
      const TEL = MascTel(save.telefone ?? '');
      const TEL2 = MascTel(save.telefone2 ?? '');
      const TEL_CONT = MascTel(save.tel_contador ?? '');
      const data = {
        ...save,
        cnpj: CNPJ,
        telefone: TEL,
        telefone2: TEL2,
        tel_contador: TEL_CONT,
      };
      return await Promise.resolve(data);
    } catch (error) {
      const retorno: ErroClienteEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }
}
