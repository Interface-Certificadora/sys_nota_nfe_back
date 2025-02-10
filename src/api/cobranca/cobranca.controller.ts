import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CobrancaService } from './cobranca.service';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LoginGuard } from '../login/login.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cobranca } from './entities/cobranca.entity';
import { ErrorEntity } from '../../entities/error.entity';
import { DeleteCobranca } from './entities/erro.cobranca.entity';
import { diskStorage } from 'multer';
import { csvFileFilter, editFileName } from './utils/file-upload.utils';

@UseGuards(LoginGuard)
@ApiBearerAuth()
@Controller('cobranca')
export class CobrancaController {
  constructor(private readonly cobrancaService: CobrancaService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: Cobranca })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorEntity })
  create(@Body() createCobrancaDto: CreateCobrancaDto) {
    return this.cobrancaService.create(createCobrancaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [Cobranca] })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorEntity })
  findAll() {
    return this.cobrancaService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK', type: Cobranca })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorEntity })
  findOne(@Param('id') id: string) {
    return this.cobrancaService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'OK', type: Cobranca })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorEntity })
  update(
    @Param('id') id: string,
    @Body() updateCobrancaDto: UpdateCobrancaDto,
  ) {
    return this.cobrancaService.update(+id, updateCobrancaDto);
  }

  @Post('csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async uploadCsv(@UploadedFile() file) {
    await this.cobrancaService.processCsv(file);
    return { message: 'Arquivo CSV enviado com sucesso!', file };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'OK', type: DeleteCobranca })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorEntity })
  remove(@Param('id') id: string) {
    return this.cobrancaService.remove(+id);
  }
}
