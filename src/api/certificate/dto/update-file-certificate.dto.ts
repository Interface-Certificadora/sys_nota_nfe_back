import { ApiProperty } from '@nestjs/swagger';
import { CreateCertificateDto } from './create-certificate.dto';
import { Transform } from 'class-transformer';

export class UpdateFileCertificateDto {
  @ApiProperty({
    description: 'Arquivo do certificado',
    type: ArrayBuffer,
    format: 'binary',
    required: true,
  })
  file: Express.Multer.File;

  @ApiProperty({
    description: 'Metadados do certificado',
    required: true,
    type: CreateCertificateDto,
  })
  @Transform(({ value }) => JSON.parse(value))
  metadata: CreateCertificateDto;
}
