import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty({
    description: 'URL do certificado',
    example: 'https://example.com/certificate.pfx',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A url tem que ser uma string' })
  @IsNotEmpty({ message: 'A url nao pode ser vazio' })
  url?: string;

  @ApiProperty({
    description: 'Senha do certificado',
    example: '123456',
    type: String,
  })
  @IsString({ message: 'A senha tem que ser uma string' })
  @IsNotEmpty({ message: 'A senha nao pode ser vazio' })
  password: string;

  @ApiProperty({
    description: 'Validade do certificado',
    example: '2023-01-01',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A validade tem que ser uma string' })
  @IsNotEmpty({ message: 'A validade nao pode ser vazio' })
  validade?: string;

  @ApiProperty({
    description: 'Status do certificado',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'O status nao pode ser vazio' })
  @IsBoolean({ message: 'O status tem que ser true ou false' })
  status?: boolean;

  @ApiProperty({
    description: 'Id do cliente',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'O id do cliente nao pode ser vazio' })
  @IsNumber({}, { message: 'O id do cliente tem que ser um numero' })
  clientId: number;
}
