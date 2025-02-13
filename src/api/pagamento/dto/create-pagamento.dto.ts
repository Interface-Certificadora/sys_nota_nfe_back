import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePagamentoDto {
  @ApiProperty({
    description: 'Id do Parceiro',
    example: 1,
    type: Number,
    required: true,
  })
  @IsNumber({}, { message: 'O id do parceiro tem que ser um numero' })
  @IsNotEmpty({ message: 'O id do parceiro nao pode ser vazio' })
  @Transform(({ value }) => Number(value))
  readonly parceiro_id: number;

  @ApiProperty({
    description: 'valor do pagamento',
    example: 100,
    type: Number,
  })
  @IsNumber({}, { message: 'O valor tem que ser um numero' })
  @IsNotEmpty({ message: 'O valor nao pode ser vazio' })
  readonly valor: number;

  @ApiProperty({
    description: 'Data de Vencimento',
    example: '2023-01-01',
    type: String,
  })
  @IsNotEmpty({ message: 'A data de vencimento é obrigatória' })
  @Transform(({ value }) => new Date(value).toISOString().split('T')[0])
  readonly venc: string;

  @ApiProperty({
    description: 'Mes de recorrente',
    example: '01',
    type: String,
  })
  @IsNotEmpty({ message: 'O mes de recorrente é obrigatória' })
  @IsString({ message: 'O mes tem que ser uma string' })
  readonly current: string;

  @ApiProperty({
    description: 'status do pagamento',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty({ message: 'O status nao pode ser vazio' })
  @IsBoolean({ message: 'O status tem que ser true ou false' })
  readonly status: boolean;

  constructor(partial: Partial<CreatePagamentoDto>) {
    Object.assign(this, partial);
  }
}
