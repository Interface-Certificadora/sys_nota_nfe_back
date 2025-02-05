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
import { CobrancaService } from './cobranca.service';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginGuard } from '../login/login.guard';

@UseGuards(LoginGuard)
@ApiBearerAuth()
@Controller('cobranca')
export class CobrancaController {
  constructor(private readonly cobrancaService: CobrancaService) {}

  @Post()
  create(@Body() createCobrancaDto: CreateCobrancaDto) {
    return this.cobrancaService.create(createCobrancaDto);
  }

  @Get()
  findAll() {
    return this.cobrancaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cobrancaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCobrancaDto: UpdateCobrancaDto,
  ) {
    return this.cobrancaService.update(+id, updateCobrancaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cobrancaService.remove(+id);
  }
}
