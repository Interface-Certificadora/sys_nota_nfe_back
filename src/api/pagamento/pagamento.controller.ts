import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Pagamento } from './entities/pagamento.entity';
import { ErrorEntity } from 'src/entities/error.entity';

@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Pagamento criado com sucesso',
    type: Pagamento,
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorEntity })
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentoService.create(createPagamentoDto);
  }

  @Get()
  findAll() {
    return this.pagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePagamentoDto: UpdatePagamentoDto,
  ) {
    return this.pagamentoService.update(+id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(+id);
  }
}
