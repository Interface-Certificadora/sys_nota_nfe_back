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
import { Certificate } from './entities/certificate.entity';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Certificado criado com sucesso',
    type: Certificate,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar o certificado',
    type: ErrorEntity,
  })
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificateService.create(createCertificateDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Certificados encontrados com sucesso',
    type: Certificate,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao encontrar os certificados',
    type: ErrorEntity,
  })
  findAll() {
    return this.certificateService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Certificado encontrado com sucesso',
    type: Certificate,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao encontrar o certificado',
    type: ErrorEntity,
  })
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Certificado atualizado com sucesso',
    type: Certificate,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar o certificado',
    type: ErrorEntity,
  })
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
            'Metadados do certificado em formato JSON ex: {"password": "123456", "clientId": 1}',
          example: JSON.stringify({
            password: '123456',
            clientId: '2023-01-01',
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
    @UploadedFile() file: any,
    @Body()
    data: {
      metadata: string;
    },
  ) {
    console.log(file);
    const dados: CreateCertificateDto = JSON.parse(data.metadata);
    return this.certificateService.uploadFile(file, dados);
  }

  @Get('download/:id')
  @ApiResponse({
    status: 200,
    description: 'Arquivo enviado com sucesso',
    type: ErrorEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao salvar o arquivo',
    type: ErrorEntity,
  })
  download(@Param('id') id: string, @Res() res: Response) {
    return this.certificateService.download(id, res);
  }
}
