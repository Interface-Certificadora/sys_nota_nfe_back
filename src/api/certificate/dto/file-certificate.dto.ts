import { ApiProperty } from '@nestjs/swagger';

export class FileCertificateDto {
  @ApiProperty({
    description: 'Arquivo do certificado',
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: Express.Multer.File;
}
