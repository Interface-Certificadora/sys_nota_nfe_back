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
  fieldname: string;

  @ApiResponseProperty({ type: String })
  originalname: string;

  @ApiResponseProperty({ type: String })
  encoding: string;

  @ApiResponseProperty({ type: String })
  mimetype: string;

  @ApiResponseProperty({ type: String })
  destination: string;

  @ApiResponseProperty({ type: String })
  filename: string;

  @ApiResponseProperty({ type: String })
  path: string;

  @ApiResponseProperty({ type: Number })
  size: number;

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
