import { ApiResponseProperty } from '@nestjs/swagger';

export class ErroClienteEntity {
  @ApiResponseProperty({
    type: String,
  })
  message: string;
}
