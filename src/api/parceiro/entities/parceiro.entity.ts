import { ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class Parceiro {
  @ApiResponseProperty({ type: Number })
  @Transform(({ value }) => Number(value))
  readonly id: number;

  @ApiResponseProperty({ type: String })
  readonly nome: string;

  @ApiResponseProperty({ type: String })
  @Transform(({ value }) => {
    const cpf = value.replace(/\D/g, '');
    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  })
  readonly cpf: string;

  @ApiResponseProperty({ type: String })
  readonly chave_pix: string;

  @ApiResponseProperty({ type: String })
  @Transform(({ value }) => {
    const tel = value.replace(/\D/g, '');
    if (tel.length === 11) {
      return tel.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    }
    if (tel.length === 10) {
      return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return tel;
  })
  readonly telefone: string;

  @ApiResponseProperty({ type: Boolean })
  readonly whatsapp: boolean;

  @ApiResponseProperty({ type: String })
  readonly email: string;

  @ApiResponseProperty({ type: Number })
  readonly valor: number;

  @ApiResponseProperty({ type: Date })
  readonly createdAt: Date;

  @ApiResponseProperty({ type: Number })
  readonly ativos: number;

  @ApiResponseProperty({ type: Number })
  readonly inativos: number;

  @ApiResponseProperty({ type: Date })
  readonly updatedAt: Date;

  constructor(partial: Partial<Parceiro>) {
    Object.assign(this, partial);
  }
}
