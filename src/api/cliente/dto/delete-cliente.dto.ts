import { ApiResponseProperty } from '@nestjs/swagger';

export class DeleteClienteDto {
  @ApiResponseProperty({ type: String })
  status: string;

  @ApiResponseProperty({ type: String })
  message: string;
}
