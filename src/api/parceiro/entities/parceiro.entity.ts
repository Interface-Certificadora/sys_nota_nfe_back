import { ApiResponseProperty } from '@nestjs/swagger';

export class Parceiro {
  @ApiResponseProperty({ type: Number })
  readonly id: number;

  @ApiResponseProperty({ type: String })
  readonly nome: string;

  @ApiResponseProperty({ type: String })
  readonly cpf: string;

  @ApiResponseProperty({ type: String })
  readonly chave_pix: string;

  @ApiResponseProperty({ type: String })
  readonly telefone: string;

  @ApiResponseProperty({ type: Boolean })
  readonly whatsapp: boolean;

  @ApiResponseProperty({ type: String })
  readonly email: string;

  @ApiResponseProperty({ type: Number })
  readonly valor: number;

  @ApiResponseProperty({ type: Date })
  readonly createdAt: Date;

  @ApiResponseProperty({ type: Date })
  readonly updatedAt: Date;
}
