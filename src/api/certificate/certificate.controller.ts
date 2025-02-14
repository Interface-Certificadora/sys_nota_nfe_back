import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileNamePfx, pfxFileFilter } from './utils/pfx-update.utils';
import { Response } from 'express';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { UpdateFileCertificateDto } from './dto/update-file-certificate.dto';
import { ErrorEntity } from 'src/entities/error.entity';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificateService.create(createCertificateDto);
  }

  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificateService.update(id, updateCertificateDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Certificado removido com sucesso',
    type: ErrorEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao remover o certificado',
    type: ErrorEntity,
  })
  remove(@Param('id') id: string) {
    return this.certificateService.remove(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo do certificado',
        },
        metadata: {
          type: 'string',
          description:
            'Metadados do certificado em formato JSON ex: {"url": "https://example.com/certificate.pfx", "password": "123456", "validade": "2023-01-01", "status": true}',
          example: JSON.stringify({
            url: 'https://example.com/certificate.pfx',
            password: '123456',
            validade: '2023-01-01',
            status: true,
          }),
        },
      },
      required: ['file', 'metadata'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Arquivo enviado com sucesso',
    type: UpdateFileCertificateDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao salvar o arquivo',
    type: ErrorEntity,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage',
        filename: editFileNamePfx,
      }),
      fileFilter: pfxFileFilter,
    }),
  )
  uploadPfx(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    data: {
      metadata: string;
    },
  ) {
    const dados: CreateCertificateDto = JSON.parse(data.metadata);
    return this.certificateService.uploadFile(file, dados);
  }

  @Get('download/:id')
  // @ApiResponse({
  //   status: 200,
  //   description: 'Arquivo enviado com sucesso',
  //   type: ErrorEntity,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Erro ao salvar o arquivo',
  //   type: ErrorEntity,
  // })
  download(@Param('id') id: string, @Res() res: Response) {
    return this.certificateService.download(id, res);
  }
}
