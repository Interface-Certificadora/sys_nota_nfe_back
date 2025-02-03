import { ApiResponseProperty } from '@nestjs/swagger';

export class ErrorParceiroEntity {
  @ApiResponseProperty({
    type: String,
  })
  message: string;
}
