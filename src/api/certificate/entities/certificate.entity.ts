import { ApiResponseProperty } from '@nestjs/swagger';
import { Cliente } from 'src/api/cliente/entities/cliente.entity';

export class Certificate {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  url: string;

  @ApiResponseProperty({ type: String })
  password: string;

  @ApiResponseProperty({ type: String })
  validade?: string;

  @ApiResponseProperty({ type: Boolean })
  status?: boolean;

  @ApiResponseProperty({ type: Number })
  clientId: number;

  @ApiResponseProperty({ type: () => Cliente })
  Client?: Cliente;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;
}
