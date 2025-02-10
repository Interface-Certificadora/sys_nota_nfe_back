import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCobrancaDto {
  @ApiProperty({
    description: 'Id do Cliente',
    example: 1,
    type: Number,
    required: true,
  })
  cliente_id: number;

  @ApiProperty({
    description: 'Id do Parceiro',
    example: 1,
    type: Number,
    required: true,
  })
  valor: number;

  @ApiProperty({
    description: 'Data de Vencimento',
    example: '2023-01-01',
    type: String,
    required: true,
  })
  @Transform(({ value }) => new Date(value).toISOString().split('T')[0]) // Converte a string para Date
  @IsNotEmpty({ message: 'A data de vencimento é obrigatória' })
  venc: string; // Alterado para Date

  @ApiProperty({
    description: 'Mes de vigencia da cobranca',
    example: '01',
    type: String,
    required: true,
  })
  @IsOptional()
  current?: string;

  @ApiProperty({
    description: 'Status da cobranca',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  status?: boolean;

  @ApiProperty({
    description: 'Observação da cobranca',
    example: 'Observação da cobranca',
    type: String,
  })
  @IsOptional()
  obs?: string;

  @ApiProperty({
    description: 'Link do boleto',
    example: 'Link do boleto',
    type: String,
  })
  @IsOptional()
  link_boleto?: string;

  constructor(partial: Partial<CreateCobrancaDto>) {
    Object.assign(this, partial);
  }
}
