import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Cliente } from './entities/cliente.entity';
import { ErroClienteEntity } from './entities/error.cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Lista de clientes retornada com sucesso.',
    type: Cliente,
  })
  @ApiResponse({
    status: 404,
    description: 'não foi possível salvar o cliente.',
    type: ErroClienteEntity,
  })
  async create(@Body() createClienteDto: CreateClienteDto) {
    const retorno = await this.clienteService.create(createClienteDto);
    console.log('🚀 ~ ClienteController ~ create ~ retorno:', retorno);
    return retorno;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso.',
    type: [Cliente],
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi Possível encontrar os registros',
    type: ErroClienteEntity,
  })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
