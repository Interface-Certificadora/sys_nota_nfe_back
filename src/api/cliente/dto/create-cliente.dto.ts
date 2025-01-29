import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'O nome do cliente',
    example: 'João da Silva',
    type: String,
  })
  @IsString({ message: 'O nome do cliente deve ser em formato texto' })
  @IsNotEmpty({ message: 'O nome do cliente é obrigatório' })
  readonly cliente: string;

  @ApiProperty({
    description: 'O nome fantasia da empresa',
    example: 'Company',
    type: String,
  })
  @IsString({ message: 'O fantasia deve ser em formato texto' })
  @IsNotEmpty({ message: 'O fantasia é obrigatório' })
  readonly fantasia: string;

  @ApiProperty({
    description: 'CNPJ',
    example: '00.000.000/0000-00',
    type: String,
  })
  @IsString({ message: 'O CNPJ deve ser em formato texto' })
  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(14, 14, { message: 'O CNPJ deve ter 14 dígitos' })
  readonly cnpj: string;

  @ApiProperty({
    description: 'IE',
    example: '000000000',
    type: String,
  })
  @IsString({ message: 'O IE deve ser em formato texto' })
  @IsNotEmpty({ message: 'O IE é obrigatório' })
  readonly ie: string;

  @ApiProperty({
    description: 'A Razão Social',
    example: 'Company LTDA',
    type: String,
  })
  @IsString({ message: 'A Razão Social deve ser em formato texto' })
  @IsNotEmpty({ message: 'A Razão Social é obrigatório' })
  readonly razaoSocial: string;

  @ApiPropertyOptional({
    description: 'O telefone 1',
    example: '(00) 0000-0000',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O telefone é obrigatório' })
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  @Length(10, 11, { message: 'O telefone deve ter de 10 a 11 dígitos' })
  readonly telefone: string;

  @ApiPropertyOptional({
    description: 'Tem whatsapp',
    example: 'true',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'O whatsapp deve ser true ou false' })
  readonly whatsapp: boolean;

  @ApiPropertyOptional({
    description: 'O telefone 2',
    example: '(00) 0000-0000',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O telefone2 é obrigatório' })
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  @Length(10, 11, { message: 'O telefone2 deve ter de 10 a 11 dígitos' })
  readonly telefone2: string;

  @ApiPropertyOptional({
    description: 'Tem whatsapp2',
    example: 'true',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'O whatsapp2 deve ser true ou false' })
  readonly whatsapp2: boolean;

  @ApiProperty({
    description: 'O email',
    example: '0EYQH@example.com',
    type: String,
  })
  @IsString({ message: 'O email deve ser em formato texto' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  readonly email: string;

  @ApiProperty({
    description: 'O usuário  do portal NFe',
    example: 'joao',
    type: String,
  })
  @IsNotEmpty({ message: 'O usuário do portal NFe é obrigatório' })
  @IsString({ message: 'O usuário do portal NFe deve ser em formato texto' })
  readonly user: string;

  @ApiProperty({
    description: 'A senha do portal NFe',
    example: '123456',
    type: String,
  })
  @IsNotEmpty({ message: 'A senha do portal NFe é obrigatório' })
  @IsString({ message: 'A senha do portal NFe deve ser em formato texto' })
  readonly password: string;

  @ApiPropertyOptional({
    description: 'A logo do clienta para o portal NFe em base64 ou url',
    example:
      'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly logo: string;

  @ApiPropertyOptional({
    description: 'A última nota para o portal NFe',
    example: '123456',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly ultimanota: string;

  @ApiPropertyOptional({
    description: 'Serie da ultima nota NFe',
    example: 'A',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly serie: string;

  @ApiPropertyOptional({
    description: 'A data de vencimento para o portal NFe',
    example: '2022-01-01',
    type: Date,
  })
  @IsOptional()
  @IsDate({ message: 'A data de vencimento deve ser uma data valida' })
  @Transform(({ value }) => new Date(value).toISOString())
  readonly vctoCd: Date;

  @ApiProperty({
    description: 'O valor do plano',
    example: '100.00',
    type: Number,
  })
  @IsNotEmpty({ message: 'O valor é obrigatório' })
  @IsNumber({ allowInfinity: false }, { message: 'O valor deve ser um número' })
  @Transform(({ value }) => parseFloat(parseFloat(value).toFixed(2)))
  readonly valor: number;

  @ApiProperty({
    description: 'O plano',
    example: 'Plano 1',
    type: String,
  })
  @IsNotEmpty({ message: 'O plano é obrigatório' })
  @IsString({ message: 'O plano deve ser em formato texto' })
  readonly plano: string;

  @ApiPropertyOptional({
    description: 'A situação tributária',
    example: 'Simples Nacional',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A situação deve ser em formato texto' })
  readonly situacao: string;

  @ApiPropertyOptional({
    description: 'o Cliente faz parte do simples?',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'o simples deve ser true ou false' })
  readonly simples: boolean;

  @ApiPropertyOptional({
    description: 'O status de ativação do portal NFe',
    example: 'true',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'O status deve ser true ou false' })
  readonly status: boolean;

  @ApiPropertyOptional({
    description: 'O domínio do portal NFe',
    example: 'www.portalnfe.com.br',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O domínio deve ser em formato texto' })
  readonly dominio: string;

  @ApiPropertyOptional({
    description: 'O nome da contabilidade',
    example: '123 Contabilidade',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O contador deve ser em formato texto' })
  readonly contador: string;

  @ApiPropertyOptional({
    description: 'O endereço da empresa',
    example: 'Rua 1',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O endereço deve ser em formato texto' })
  readonly endereco: string;

  @ApiPropertyOptional({
    description: 'O bairro da empresa',
    example: 'Bairro 1',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O bairro deve ser em formato texto' })
  readonly bairro: string;

  @ApiPropertyOptional({
    description: 'A cidade da empresa',
    example: 'Cidade 1',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A cidade deve ser em formato texto' })
  readonly cidade: string;

  @ApiPropertyOptional({
    description: 'A UF da empresa',
    example: 'SP',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A UF deve ser em formato texto' })
  readonly uf: string;

  @ApiPropertyOptional({
    description: 'O CEP da empresa',
    example: '12345678',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O CEP deve ser em formato texto' })
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  @Length(8, 8, { message: 'O CEP deve ter 8 dígitos' })
  readonly cep: string;

  @ApiPropertyOptional({
    description: 'O complemento do endereço da empresa',
    example: 'Complemento 1',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O complemento deve ser em formato texto' })
  readonly complemento: string;

  @ApiPropertyOptional({
    description: 'O número do endereço da empresa',
    example: '123',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O número deve ser em formato texto' })
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  readonly numero: string;

  @ApiPropertyOptional({
    description: 'O Dia de fechamento do plano',
    example: 10,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O fechamento deve ser um número' })
  @Transform(({ value }) => Number(value))
  @Min(1, { message: 'O tempo de fechamento deve ser no mínimo 1' })
  @Max(31, { message: 'O tempo de fechamento deve ser no máximo 31' })
  readonly fechamento: number;

  @ApiPropertyOptional({
    description: 'O Dia de teste do plano',
    example: 10,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O teste deve ser um número' })
  @Transform(({ value }) => Number(value))
  @Min(0, { message: 'O tempo de teste deve ser no mínimo 0' })
  @Max(90, { message: 'O tempo de teste deve ser no máximo 90' })
  readonly teste: number;

  @ApiPropertyOptional({
    description: 'A data de vencimento do plano',
    example: '2022-01-01',
    type: Date,
  })
  @IsOptional()
  @IsDate({ message: 'A data de vencimento deve ser uma data valida' })
  @Transform(({ value }) => new Date(value).toISOString())
  readonly vctoPlano: Date;

  @ApiPropertyOptional({
    description: 'Tem Comissão',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'A comissão deve ser true ou false' })
  readonly comissao: boolean;

  @ApiPropertyOptional({
    description: 'Valor da comissão',
    example: 10,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'A comissão deve ser um número' })
  @Transform(({ value }) => parseFloat(parseFloat(value).toFixed(2)))
  readonly valor_comissao: number;

  @ApiPropertyOptional({
    description: 'Justificativa',
    example: 'Justificativa',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A justificativa deve ser em formato texto' })
  readonly justificativa: string;

  @ApiPropertyOptional({
    description: 'Certificado',
    example: 'www.teste.com.br/certificado/certificado.pfx',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O certificado deve ser em formato texto' })
  readonly certificado: string;

  @ApiPropertyOptional({
    description: 'Key Certificado',
    example: '314217652687',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A key certificado deve ser em formato texto' })
  readonly key_certificado: string;

  @ApiPropertyOptional({
    description: 'Telefone Contador',
    example: '(00) 0000-0000',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O telefone do contador deve ser em formato texto' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(10, 11, {
    message: 'O telefone do contador deve ter de 10 a 11 dígitos',
  })
  readonly tel_contador: string;

  @ApiPropertyOptional({
    description: 'Whatsapp Contador',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'O whatsapp do contador deve ser true ou false' })
  readonly whatsapp_cont: boolean;

  @ApiPropertyOptional({
    description: 'Id do comissionado',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O id do comissionado deve ser um número' })
  readonly comissao_id: number; //id do comissionado

  // @ApiPropertyOptional({
  //   description: 'Nome do comissionado',
  //   example: 'Nome',
  //   type: String,
  // })
  // @IsOptional()
  // @IsString({ message: 'O nome do comissionado deve ser em formato texto' })
  // readonly nome_comissionado: string;

  // @ApiPropertyOptional({
  //   description: 'Telefone do comissionado',
  //   example: '(00) 0000-0000',
  //   type: String,
  // })
  // @IsOptional()
  // @IsString({ message: 'O telefone do comissionado deve ser em formato texto' })
  // @Transform(({ value }) => value.replace(/\D/g, ''))
  // @Length(10, 11, {
  //   message: 'O telefone do comissionado deve ter de 10 a 11 dígitos',
  // })
  // readonly telefone_comissionado: string; //telefone do comissionado

  // @ApiPropertyOptional({
  //   description: 'Whatsapp do comissionado',
  //   example: true,
  //   type: Boolean,
  // })
  // @IsOptional()
  // @IsBoolean({ message: 'O whatsapp do comissionado deve ser true ou false' })
  // readonly whatsapp_comissionado: boolean; //tem whatsapp do comissionado

  // @ApiPropertyOptional({
  //   description: 'Pix do comissionado',
  //   example: '00000000-0',
  //   type: String,
  // })
  // @IsOptional()
  // @IsString({ message: 'O pix do comissionado deve ser em formato texto' })
  // @Transform(({ value }) => value.replace(/\D/g, ''))
  // readonly pix_comissionado: string; //pix do comissionado

  // @ApiPropertyOptional({
  //   description: 'Email do comissionado',
  //   example: 'k0g0o@example.com',
  //   type: String,
  // })
  // @IsOptional()
  // @IsString({ message: 'O email do comissionado deve ser em formato texto' })
  // readonly email_comissionado: string; //email do comissionado
}
