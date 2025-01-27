import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  async create(data: CreateClienteDto): Promise<Cliente> {
    try {
      console.log(data);
      const retorno = {
        id: 1,
        ...data,
        sefaz: false,
        createdAt: undefined,
        updatedAt: undefined,
      };
      return retorno;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all cliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
