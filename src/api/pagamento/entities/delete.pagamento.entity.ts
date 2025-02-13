import { ApiResponseProperty } from '@nestjs/swagger';

export class DeletePagamento {
  @ApiResponseProperty({ type: String })
  message: string;
}
