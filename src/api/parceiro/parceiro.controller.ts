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
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(LoginGuard)
@ApiBearerAuth()
@Controller('parceiro')
export class ParceiroController {
  constructor(private readonly parceiroService: ParceiroService) {}

  @Post()
  create(@Body() createParceiroDto: CreateParceiroDto) {
    return this.parceiroService.create(createParceiroDto);
  }

  @Get()
  findAll() {
    return this.parceiroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parceiroService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParceiroDto: UpdateParceiroDto,
  ) {
    return this.parceiroService.update(+id, updateParceiroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parceiroService.remove(+id);
  }
}
