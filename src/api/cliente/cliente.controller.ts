import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Cliente } from './entities/cliente.entity';
import { ErroClienteEntity } from './entities/error.cliente.entity';
import { DeleteClienteDto } from './dto/delete-cliente.dto';
import { LoginGuard } from '../login/login.guard';
import { ErrorEntity } from '../../entities/error.entity';

@UseGuards(LoginGuard)
@ApiBearerAuth()
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
  findAll(): Promise<Cliente[] | ErroClienteEntity> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso.',
    type: Cliente,
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi Possível encontrar o registro',
    type: ErroClienteEntity,
  })
  findOne(@Param('id') id: string): Promise<Cliente | ErroClienteEntity> {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso.',
    type: Cliente,
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi Possível encontrar o registro',
    type: ErroClienteEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente | ErroClienteEntity> {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso.',
    type: DeleteClienteDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi Possível encontrar o registro',
    type: ErroClienteEntity,
  })
  /**
   * Remove um cliente pelo ID.
   * @param id O ID do cliente a ser removido.
   * @returns Um objeto com o status e a mensagem de sucesso.
   */
  remove(@Param('id') id: string): Promise<DeleteClienteDto | ErrorEntity> {
    return this.clienteService.remove(+id);
  }
}
