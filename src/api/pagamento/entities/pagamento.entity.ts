import { ApiResponseProperty } from '@nestjs/swagger';
import { Parceiro } from 'src/api/parceiro/entities/parceiro.entity';

export class Pagamento {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: Number })
  parceiro_id: number;

  @ApiResponseProperty({ type: () => Parceiro })
  parceiro: Parceiro;

  @ApiResponseProperty({ type: Number })
  valor: number;

  @ApiResponseProperty({ type: String })
  venc: string;

  @ApiResponseProperty({ type: String })
  current: string;

  @ApiResponseProperty({ type: Boolean })
  status: boolean;

  @ApiResponseProperty({ type: String })
  createdAt: Date;

  @ApiResponseProperty({ type: String })
  updatedAt: Date;
}
