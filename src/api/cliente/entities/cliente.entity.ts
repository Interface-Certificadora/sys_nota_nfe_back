import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class Cliente {
  @ApiResponseProperty({ type: Number })
  @Expose()
  id: number;

  @ApiResponseProperty({ type: String })
  @Expose()
  cliente: string; //nome do cliente

  @ApiResponseProperty({ type: String })
  @Expose()
  fantasia: string; //nome fantasia

  @ApiResponseProperty({ type: String })
  @Expose()
  @Transform(({ value }) => value.replace())
  cnpj: string; //cnpj

  @ApiResponseProperty({ type: String })
  @Expose()
  ie: string; //inscrição estadual

  @ApiResponseProperty({ type: String })
  @Expose()
  razaoSocial: string; //razao social

  @ApiResponseProperty({
    type: String,
  })
  @Expose()
  telefone: string; //telefone 1

  @ApiResponseProperty({ type: Boolean })
  @Expose()
  whatsapp: boolean; //tem whatsapp tel 1

  @ApiResponseProperty({
    type: String,
  })
  @Expose()
  telefone2: string; //telefone 2

  @ApiResponseProperty({ type: Boolean })
  @Expose()
  whatsapp2: boolean; //tem whatsapp tel 2

  @ApiResponseProperty({ type: String })
  @Expose()
  email: string; //email

  @ApiResponseProperty({ type: String })
  @Expose()
  user: string; //usuário do portal Nota NFe

  @ApiResponseProperty({ type: String })
  @Expose()
  password: string; //senha do portal Nota NFe

  @ApiResponseProperty({
    type: String,
  })
  @Expose()
  logo: string; //logo para adicionar no portal Nota NFe formato base64 ou url

  @ApiResponseProperty({ type: String })
  @Expose()
  ultimanota: string; //ultimo numero da nota antes do sistema

  @ApiResponseProperty({ type: String })
  @Expose()
  serie: string; //serie da ultima nota

  @ApiResponseProperty({ type: Date })
  @Expose()
  vctoCd: Date; //data de vencimento do certificado digital

  @ApiResponseProperty({ type: Number })
  @Expose()
  valor: number; //valor do plano

  @ApiResponseProperty({ type: String })
  @Expose()
  plano: string; //tipo de plano

  @ApiResponseProperty({ type: String })
  @Expose()
  situacao: string; //situação do simples

  @ApiResponseProperty({ type: Boolean })
  @Expose()
  simples: boolean; //tem simples

  @ApiResponseProperty({ type: Boolean })
  @Expose()
  status: boolean; //status do cliente no sistema nota nfe

  @ApiResponseProperty({ type: String })
  @Expose()
  dominio: string; //dominio do portal Nota NFe

  @ApiResponseProperty({ type: String })
  @Expose()
  contador: string; //nome da contabilidade

  @ApiResponseProperty({ type: String })
  @Expose()
  tel_contador: string; //telefone da contabilidade

  @ApiResponseProperty({ type: Boolean })
  @Expose()
  whatsapp_cont: boolean; //tem whatsapp da contabilidade

  @ApiResponseProperty({ type: String })
  @Expose()
  endereco: string; //endereço da empresa

  @ApiResponseProperty({ type: String })
  @Expose()
  bairro: string; //bairro da empresa

  @ApiResponseProperty({ type: String })
  @Expose()
  cidade: string; //cidade da empresa

  @ApiResponseProperty({ type: String })
  @Expose()
  uf: string; //uf da empresa

  @ApiResponseProperty({ type: String })
  @Expose()
  cep: string; //cep da empresa

  @ApiResponseProperty({ type: String })
  @Expose()
  complemento: string; //complemento do endereco da empresa

  @ApiResponseProperty({ type: String })
  @Expose()
  numero: string; //numero da empresa

  @ApiResponseProperty({ type: Number })
  @Expose()
  fechamento: number; //dia de fechamento do plano

  @ApiResponseProperty({ type: Number })
  @Expose()
  teste: number; //dia de teste do plano

  @ApiResponseProperty({ type: Date })
  @Expose()
  vctoPlano: Date; //data de vencimento total do plano

  @ApiResponseProperty({ type: Boolean })
  @Expose()
  comissao: boolean; //tem comissao

  @ApiResponseProperty({ type: Boolean })
  @Expose()
  sefaz: boolean; //tem sefaz

  @ApiResponseProperty({ type: Number })
  @Expose()
  valor_comissao: number; //valor da comissao

  @ApiResponseProperty({ type: String })
  @Expose()
  justificativa: string; //justificativa

  @ApiResponseProperty({ type: String })
  @Expose()
  certificado: string; //endereço do certificado

  @ApiResponseProperty({ type: String })
  @Expose()
  key_certificado: string; //senha do certificado

  @ApiResponseProperty({ type: Number })
  @Expose()
  readonly comissao_id: number; //id do comissionado

  // @ApiResponseProperty({ type: String })
  // @Expose()
  // nome_comissionado: string; //nome do comissionado

  // @ApiResponseProperty({ type: String })
  // @Expose()
  // telefone_comissionado: string; //telefone do comissionado

  // @ApiResponseProperty({ type: Boolean })
  // @Expose()
  // whatsapp_comissionado: boolean; //tem whatsapp do comissionado

  // @ApiResponseProperty({ type: String })
  // @Expose()
  // pix_comissionado: string; //pix do comissionado

  // @ApiResponseProperty({ type: String })
  // @Expose()
  // email_comissionado: string; //email do comissionado

  @ApiResponseProperty({ type: Date })
  @Expose()
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  @Expose()
  updatedAt: Date;
}
