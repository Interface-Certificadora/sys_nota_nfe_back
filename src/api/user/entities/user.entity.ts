import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  @Exclude()
  password: string;

  @ApiResponseProperty({ type: String })
  @Exclude()
  senha: string;

  @ApiResponseProperty({ type: Boolean })
  status: boolean;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
