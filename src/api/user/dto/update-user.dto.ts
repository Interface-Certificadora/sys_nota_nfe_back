import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nome do Usuario',
    example: 'João da Silva',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString({ message: 'O nome tem que ser uma string' })
  name: string;

  @ApiPropertyOptional({
    description: 'Email para login',
    example: 'email@email.com',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString({ message: 'O email tem que ser uma string' })
  email: string;

  @ApiPropertyOptional({
    description: 'Status do Usuario',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'O status tem que ser true ou false' })
  readonly status: boolean;
}
