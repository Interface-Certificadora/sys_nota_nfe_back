import { ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Cobranca } from '../../cobranca/entities/cobranca.entity';
import { Parceiro } from '../../parceiro/entities/parceiro.entity';
import { Certificate } from 'src/api/certificate/entities/certificate.entity';

export class Cliente {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  cliente: string; //nome do cliente

  @ApiResponseProperty({ type: String })
  fantasia?: string; //nome fantasia

  @ApiResponseProperty({ type: String })
  @Transform(({ value }) => {
    const cnpj = value.replace(/\D/g, '');
    if (cnpj.length === 14) {
      return cnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      );
    }
    return cnpj;
  })
  cnpj: string; //cnpj

  @ApiResponseProperty({ type: String })
  ie: string; //inscrição estadual

  @ApiResponseProperty({ type: String })
  razaoSocial: string; //razao social

  @ApiResponseProperty({
    type: String,
  })
  @Transform(({ value }) => {
    const tel = value.replace(/\D/g, '');
    if (tel.length === 11) {
      return tel.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    }
    if (tel.length === 10) {
      return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return tel;
  })
  telefone?: string; //telefone 1

  @ApiResponseProperty({ type: Boolean })
  whatsapp: boolean; //tem whatsapp tel 1

  @ApiResponseProperty({
    type: String,
  })
  @Transform(({ value }) => {
    const tel = value;
    if (!tel) return null;
    if (tel.length === 11) {
      return tel.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    } else if (tel.length === 10) {
      return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else return tel;
  })
  telefone2: string; //telefone 2

  @ApiResponseProperty({ type: Boolean })
  whatsapp2: boolean; //tem whatsapp tel 2

  @ApiResponseProperty({ type: String })
  email: string; //email

  @ApiResponseProperty({ type: String })
  user: string; //usuário do portal Nota NFe

  @ApiResponseProperty({ type: String })
  password: string; //senha do portal Nota NFe

  @ApiResponseProperty({
    type: String,
  })
  logo: string; //logo para adicionar no portal Nota NFe formato base64 ou url

  @ApiResponseProperty({ type: String })
  ultimanota: string; //ultimo numero da nota antes do sistema

  @ApiResponseProperty({ type: String })
  serie: string; //serie da ultima nota

  @ApiResponseProperty({ type: Date })
  vctoCd: Date; //data de vencimento do certificado digital

  @ApiResponseProperty({ type: Number })
  valor: number; //valor do plano

  @ApiResponseProperty({ type: String })
  plano: string; //tipo de plano

  @ApiResponseProperty({ type: String })
  situacao: string; //situação do simples

  @ApiResponseProperty({ type: Boolean })
  simples: boolean; //tem simples

  @ApiResponseProperty({ type: Boolean })
  status: boolean; //status do cliente no sistema nota nfe

  @ApiResponseProperty({ type: String })
  dominio: string; //dominio do portal Nota NFe

  @ApiResponseProperty({ type: String })
  contador: string; //nome da contabilidade

  @ApiResponseProperty({ type: String })
  @Transform(({ value }) => {
    const tel = value.replace(/\D/g, '');
    if (tel.length === 11) {
      return tel.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    }
    if (tel.length === 10) {
      return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return tel;
  })
  tel_contador: string; //telefone da contabilidade

  @ApiResponseProperty({ type: Boolean })
  whatsapp_cont: boolean; //tem whatsapp da contabilidade

  @ApiResponseProperty({ type: String })
  endereco: string; //endereço da empresa

  @ApiResponseProperty({ type: String })
  bairro: string; //bairro da empresa

  @ApiResponseProperty({ type: String })
  cidade: string; //cidade da empresa

  @ApiResponseProperty({ type: String })
  uf: string; //uf da empresa

  @ApiResponseProperty({ type: String })
  cep: string; //cep da empresa

  @ApiResponseProperty({ type: String })
  complemento: string; //complemento do endereco da empresa

  @ApiResponseProperty({ type: String })
  numero: string; //numero da empresa

  @ApiResponseProperty({ type: Number })
  fechamento: number; //dia de fechamento do plano

  @ApiResponseProperty({ type: Number })
  teste: number; //dia de teste do plano

  @ApiResponseProperty({ type: Date })
  vctoPlano: Date; //data de vencimento total do plano

  @ApiResponseProperty({ type: Boolean })
  comissao: boolean; //tem comissao

  @ApiResponseProperty({ type: Boolean })
  sefaz: boolean; //tem sefaz

  @ApiResponseProperty({ type: Number })
  valor_comissao: number; //valor da comissao

  @ApiResponseProperty({ type: String })
  justificativa: string; //justificativa

  @ApiResponseProperty({ type: String })
  certificado: string; //endereço do certificado

  @ApiResponseProperty({ type: String })
  key_certificado: string; //senha do certificado

  @ApiResponseProperty({ type: Number })
  comissao_id: number; //id do comissionado

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  @ApiResponseProperty({ type: () => [Cobranca] })
  cobrancas?: Cobranca[]; // Relação com Cobrancas

  @ApiResponseProperty({ type: Number })
  parceiro_id?: number;

  @ApiResponseProperty({ type: () => Parceiro })
  parceiro?: Parceiro;

  @ApiResponseProperty({ type: () => Certificate })
  certificate?: Certificate;

  constructor(partial: Partial<Cliente>) {
    Object.assign(this, partial);
  }
}
