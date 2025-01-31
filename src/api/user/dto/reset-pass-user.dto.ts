import { ApiResponseProperty } from '@nestjs/swagger';

export class ResetPassUserDto {
  @ApiResponseProperty({ type: String })
  readonly password: string;

  @ApiResponseProperty({ type: String })
  readonly confirm: string;

  @ApiResponseProperty({ type: String })
  readonly email: string;
}
