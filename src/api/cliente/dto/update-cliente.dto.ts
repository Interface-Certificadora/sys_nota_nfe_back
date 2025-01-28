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
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClienteDto {
  @ApiPropertyOptional({
    description: 'O nome do cliente',
    example: 'João da Silva',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O nome do cliente deve ser em formato texto' })
  @IsNotEmpty({ message: 'O nome do cliente é obrigatório' })
  readonly cliente: string;

  @ApiPropertyOptional({
    description: 'O nome fantasia da empresa',
    example: 'Company',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O fantasia deve ser em formato texto' })
  @IsNotEmpty({ message: 'O fantasia é obrigatório' })
  readonly fantasia: string;

  @ApiPropertyOptional({
    description: 'CNPJ',
    example: '00.000.000/0000-00',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O CNPJ deve ser em formato texto' })
  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(14, 14, { message: 'O CNPJ deve ter 14 dígitos' })
  readonly cnpj: string;

  @ApiPropertyOptional({
    description: 'IE - Inscrição Estadual',
    example: '000000000',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O IE deve ser em formato texto' })
  @IsNotEmpty({ message: 'O IE é obrigatório' })
  readonly ie: string;

  @ApiPropertyOptional({
    description: 'Razão Social',
    example: 'Company LTDA',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A Razão Social deve ser em formato texto' })
  @IsNotEmpty({ message: 'A Razão Social é obrigatório' })
  readonly razaoSocial: string;

  @ApiPropertyOptional({
    description: 'Telefone',
    example: '(00) 00000-0000',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O telefone é obrigatório' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(10, 11, { message: 'O telefone deve ter 10 a 11 dígitos' })
  readonly telefone: string;

  @ApiPropertyOptional({
    description: 'Tem Whatsapp?',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'O whatsapp deve ser true ou false' })
  readonly whatsapp: boolean;

  @ApiPropertyOptional({
    description: 'Telefone 2',
    example: '(00) 0 0000-0000',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O telefone2 é obrigatório' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(10, 11, { message: 'O telefone2 deve ter 10 a 11 dígitos' })
  readonly telefone2: string;

  @ApiPropertyOptional({
    description: 'Tem Whatsapp 2?',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'O whatsapp2 deve ser true ou false' })
  readonly whatsapp2: boolean;

  @ApiPropertyOptional({
    description: 'Email',
    example: 'b0k6v@example.com',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O email deve ser em formato texto' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  readonly email: string;

  @ApiPropertyOptional({
    description: 'Usuário',
    example: 'joao',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly user: string;

  @ApiPropertyOptional({
    description: 'Senha',
    example: '123456',
    type: String,
  })
  @IsOptional()
  @IsString()
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
    description: 'Numero da ultima nota NFe',
    example: '12598498',
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
    description: 'Data de vencimento do certificado ',
    example: '2021-01-01',
    type: Date,
  })
  @IsOptional()
  @IsDate({ message: 'A data de vencimento deve ser uma data valida' })
  @Transform(({ value }) => new Date(value).toISOString())
  readonly vctoCd: Date;

  @ApiPropertyOptional({
    description: 'O valor do plano',
    example: '100.00',
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'O valor é obrigatório' })
  @IsNumber({ allowInfinity: false }, { message: 'O valor deve ser um número' })
  @Transform(({ value }) => parseFloat(parseFloat(value).toFixed(2)))
  readonly valor: number;

  @ApiPropertyOptional({
    description: 'tipo de plano',
    example: 'Plano 1',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'O plano é obrigatório' })
  @IsString({ message: 'O plano deve ser em formato texto' })
  readonly plano: string;

  @ApiPropertyOptional({
    description: 'Situação do simples da empresa',
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
    description: 'Status de ativação do portal NFe',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'O status deve ser true ou false' })
  readonly status: boolean;

  @ApiPropertyOptional({
    description: 'Domínio',
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
    description: 'Endereço',
    example: 'Rua 123',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O endereço deve ser em formato texto' })
  readonly endereco: string;

  @ApiPropertyOptional({
    description: 'Bairro',
    example: 'Centro',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O bairro deve ser em formato texto' })
  readonly bairro: string;

  @ApiPropertyOptional({
    description: 'Cidade',
    example: 'São Paulo',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A cidade deve ser em formato texto' })
  readonly cidade: string;

  @ApiPropertyOptional({
    description: 'UF',
    example: 'SP',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A UF deve ser em formato texto' })
  readonly uf: string;

  @ApiPropertyOptional({
    description: 'CEP',
    example: '12345-678',
    type: String,
    maxLength: 8,
    minLength: 8,
  })
  @IsOptional()
  @IsString({ message: 'O CEP deve ser em formato texto' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Length(8, 8, {
    message: 'O CEP deve conter exatamente 8 caracteres numéricos',
  })
  readonly cep: string;

  @ApiPropertyOptional({
    description: 'Complemento',
    example: 'Casa',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O complemento deve ser em formato texto' })
  readonly complemento: string;

  @ApiPropertyOptional({
    description: 'Número',
    example: '123',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O número deve ser em formato texto' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  readonly numero: string;

  @ApiPropertyOptional({
    description: 'Dia de fechamento do plano',
    example: 20,
    type: Number,
    minimum: 1,
    maximum: 31,
  })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false },
    { message: 'O fechamento deve ser um número' },
  )
  @Min(1, { message: 'O dia de fechamento deve ser no mínimo 1' })
  @Max(31, { message: 'O dia de fechamento deve ser no máximo 31' })
  readonly fechamento: number;

  @ApiPropertyOptional({
    description: 'tempo em Dias para teste',
    example: 20,
    type: Number,
    minimum: 1,
    maximum: 90,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false }, { message: 'O teste deve ser um número' })
  @Transform(({ value }) => Number(value))
  @Min(1, { message: 'O tempo de teste deve ser no mínimo 0' })
  @Max(90, { message: 'O tempo de teste deve ser no máximo 90' })
  readonly teste: number;

  @ApiPropertyOptional({
    description: 'Data de vencimento do plano',
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
