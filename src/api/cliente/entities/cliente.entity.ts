import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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

  @Expose()
  cnpj: string; //cnpj

  @Expose()
  ie: string; //inscrição estadual

  @Expose()
  razaoSocial: string; //razao social

  @Expose()
  telefone: string; //telefone 1

  @Expose()
  whatsapp: boolean; //tem whatsapp tel 1

  @Expose()
  telefone2: string; //telefone 2

  @Expose()
  whatsapp2: boolean; //tem whatsapp tel 2

  @Expose()
  email: string; //email

  @Expose()
  user: string; //usuário do portal Nota NFe

  @Expose()
  password: string; //senha do portal Nota NFe

  @Expose()
  logo: string; //logo para adicionar no portal Nota NFe formato base64 ou url

  @Expose()
  ultimanota: string; //ultimo numero da nota antes do sistema

  @Expose()
  serie: string; //serie da ultima nota

  @Expose()
  vctoCd: Date; //data de vencimento do certificado digital

  @Expose()
  valor: number; //valor do plano

  @Expose()
  plano: string; //tipo de plano

  @Expose()
  situacao: string; //situação do simples

  @Expose()
  simples: boolean; //tem simples

  @Expose()
  status: boolean; //status do cliente no sistema nota nfe

  @Expose()
  dominio: string; //dominio do portal Nota NFe

  @Expose()
  contador: string; //nome da contabilidade

  @Expose()
  tel_contador: string; //telefone da contabilidade

  @Expose()
  whatsapp_cont: boolean; //tem whatsapp da contabilidade

  @Expose()
  endereco: string; //endereço da empresa

  @Expose()
  bairro: string; //bairro da empresa

  @Expose()
  cidade: string; //cidade da empresa

  @Expose()
  uf: string; //uf da empresa

  @Expose()
  cep: string; //cep da empresa

  @Expose()
  complemento: string; //complemento do endereco da empresa

  @Expose()
  numero: string; //numero da empresa

  @Expose()
  fechamento: number; //dia de fechamento do plano

  @Expose()
  teste: number; //dia de teste do plano

  @Expose()
  vctoPlano: Date; //data de vencimento total do plano

  @Expose()
  comissao: boolean; //tem comissao

  @Expose()
  sefaz: boolean; //tem sefaz

  @Expose()
  valor_comissao: number; //valor da comissao

  @Expose()
  justificativa: string; //justificativa

  @Expose()
  certificado: string; //endereço do certificado

  @Expose()
  key_certificado: string; //senha do certificado

  @Expose()
  nome_comissionado: string; //nome do comissionado

  @Expose()
  telefone_comissionado: string; //telefone do comissionado

  @Expose()
  whatsapp_comissionado: boolean; //tem whatsapp do comissionado

  @Expose()
  pix_comissionado: string; //pix do comissionado

  @Expose()
  email_comissionado: string; //email do comissionado

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
