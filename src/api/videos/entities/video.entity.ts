import { ApiResponseProperty } from '@nestjs/swagger';

export class Video {
  @ApiResponseProperty({ type: Number })
  readonly id: number;

  @ApiResponseProperty({ type: String })
  readonly titulo: string;

  @ApiResponseProperty({ type: String })
  readonly url: string;
}
