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
import { ParceiroService } from './parceiro.service';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';
import { LoginGuard } from '../login/login.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Parceiro } from './entities/parceiro.entity';
import { ErrorParceiroEntity } from './entities/error-parceiro.entity';
import { ParceiroDeleteEntity } from './entities/parceiro.delete.entity';

@UseGuards(LoginGuard)
@ApiBearerAuth()
@Controller('parceiro')
export class ParceiroController {
  constructor(private readonly parceiroService: ParceiroService) {}

  @Post()
  @ApiResponse({ status: 201, type: Parceiro, description: 'Criar Parceiro' })
  @ApiResponse({ status: 400, type: ErrorParceiroEntity, description: 'Erro' })
  async create(@Body() createParceiroDto: CreateParceiroDto) {
    return await this.parceiroService.create(createParceiroDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Parceiro,
    isArray: true,
    description: 'Listar Parceiros',
  })
  @ApiResponse({ status: 400, type: ErrorParceiroEntity, description: 'Erro' })
  findAll() {
    return this.parceiroService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Parceiro,
    description: 'Parceiro by ID',
  })
  @ApiResponse({ status: 400, type: ErrorParceiroEntity, description: 'Erro' })
  findOne(@Param('id') id: string) {
    return this.parceiroService.findOne(+id);
  }

  @Get('select')
  @ApiResponse({
    status: 200,
    type: Parceiro,
    isArray: true,
    description: 'Listar Parceiros',
  })
  @ApiResponse({ status: 400, type: ErrorParceiroEntity, description: 'Erro' })
  selectAll() {
    return this.parceiroService.selectAllParceiro();
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    type: Parceiro,
    description: 'Atualizar Parceiro',
  })
  @ApiResponse({ status: 400, type: ErrorParceiroEntity, description: 'Erro' })
  update(
    @Param('id') id: string,
    @Body() updateParceiroDto: UpdateParceiroDto,
  ) {
    return this.parceiroService.update(+id, updateParceiroDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: ParceiroDeleteEntity,
    description: 'Desativar Parceiro',
  })
  @ApiResponse({ status: 400, type: ErrorParceiroEntity, description: 'Erro' })
  async remove(@Param('id') id: string) {
    return await this.parceiroService.remove(+id);
  }
}
