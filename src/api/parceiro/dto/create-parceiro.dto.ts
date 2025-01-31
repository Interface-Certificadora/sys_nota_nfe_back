import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateParceiroDto {
  @ApiProperty({
    description: 'Nome do Parceiro',
    example: 'Parceiro 1',
    type: String,
    required: true,
  })
  @IsString({ message: 'O nome tem que ser uma string' })
  @IsNotEmpty({ message: 'O nome nao pode ser vazio' })
  readonly nome: string;

  @ApiProperty({
    description: 'CPF',
    example: '000.000.000-00',
    type: String,
    required: false,
  })
  @IsString({ message: 'CPF tem que ser uma string' })
  @IsNotEmpty({ message: 'CPF nao pode ser vazio' })
  readonly cpf: string;

  @ApiProperty({
    description: 'Chave Pix',
    example: 'chave_pix',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Chave Pix tem que ser uma string' })
  @IsNotEmpty({ message: 'Chave Pix nao pode ser vazio' })
  readonly chave_pix: string;

  @ApiProperty({
    description: 'Telefone',
    example: 'telefone',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefone tem que ser uma string' })
  @IsNotEmpty({ message: 'Telefone nao pode ser vazio' })
  readonly telefone: string;

  @ApiProperty({
    description: 'Tem Whatsapp?',
    example: 'whatsapp',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Whatsapp tem que ser true ou false' })
  readonly whatsapp: boolean;

  @ApiProperty({
    description: 'Email',
    example: 'email',
    type: String,
    required: true,
  })
  @IsString({ message: 'Email tem que ser uma string' })
  @IsNotEmpty({ message: 'Email nao pode ser vazio' })
  readonly email: string;

  @ApiProperty({
    description: 'Valor',
    example: 0,
    type: Number,
    required: true,
  })
  @IsNumber({}, { message: 'Valor tem que ser um número' })
  @IsNotEmpty({ message: 'Valor nao pode ser vazio' })
  readonly valor: number;
}
