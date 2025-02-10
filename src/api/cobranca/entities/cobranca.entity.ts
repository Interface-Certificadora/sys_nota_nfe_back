import { ApiResponseProperty } from '@nestjs/swagger';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Exclude } from 'class-transformer';

export class Cobranca {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: Number })
  @Exclude()
  cliente_id: number;

  @ApiResponseProperty({ type: Number })
  valor: number;

  @ApiResponseProperty({ type: String })
  venc: string;

  @ApiResponseProperty({ type: String })
  current: string;

  @ApiResponseProperty({ type: Boolean })
  status: boolean;

  @ApiResponseProperty({ type: String })
  obs: string;

  @ApiResponseProperty({ type: String })
  link_boleto: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  @ApiResponseProperty({ type: () => Cliente })
  cliente?: Cliente;

  constructor(partial: Partial<Cobranca>) {
    Object.assign(this, partial);
  }
}
