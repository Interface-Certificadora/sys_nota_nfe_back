import { ApiResponseProperty } from '@nestjs/swagger';

export class DeleteCobranca {
  @ApiResponseProperty({ type: String })
  message: string;
}
