import { HttpException, Injectable } from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { ErrorEntity } from 'src/entities/error.entity';
import { plainToClass } from 'class-transformer';
import { Cobranca } from './entities/cobranca.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { DeleteCobranca } from './entities/erro.cobranca.entity';
import * as csv from 'csv-parser';
import * as fs from 'fs';

type CsvRead = {
  CNPJ: string;
  Cliente: string;
  Vencimento: string;
  Valor: string;
  LINK: string;
};
@Injectable()
export class CobrancaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateCobrancaDto): Promise<Cobranca | ErrorEntity> {
    try {
      const save = await this.prismaService.cobranca.create({
        data: {
          cliente_id: data.cliente_id,
          valor: data.valor,
          venc: data.venc,
          current: data.current,
          status: data.status,
          obs: data.obs,
          link_boleto: data.link_boleto,
        },
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
          valor: true,
          venc: true,
          current: true,
          status: true,
          obs: true,
          link_boleto: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return plainToClass(Cobranca, save);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findAll(): Promise<Cobranca[] | ErrorEntity> {
    try {
      const getAll = await this.prismaService.cobranca.findMany({
        where: {
          status: true,
        },
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
          valor: true,
          venc: true,
          current: true,
          status: true,
          obs: true,
          link_boleto: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return getAll.map((i: any) => plainToClass(Cobranca, i));
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findOne(id: number) {
    try {
      const req = await this.prismaService.cobranca.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
          valor: true,
          venc: true,
          current: true,
          status: true,
          obs: true,
          link_boleto: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return plainToClass(Cobranca, req);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async update(
    id: number,
    dados: UpdateCobrancaDto,
  ): Promise<Cobranca | ErrorEntity> {
    try {
      const update = await this.prismaService.cobranca.update({
        where: {
          id,
        },
        data: {
          cliente_id: dados.cliente_id,
          valor: dados.valor,
          venc: dados.venc,
          current: dados.current,
          status: dados.status,
          obs: dados.obs,
          link_boleto: dados.link_boleto,
        },
        include: {
          cliente: {
            select: {
              id: true,
              cliente: true,
            },
          },
        },
      });

      return plainToClass(Cobranca, update);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async processCsv(file: Express.Multer.File) {
    const path = file.path;

    try {
      const fileStream = fs.createReadStream(path);

      await new Promise((resolve, reject) => {
        fileStream
          .pipe(csv({ separator: ',' })) // Configuração do parser
          .on('data', async (record: CsvRead) => {
            console.log(record);

            const cliente = await this.IsExistClient(
              record.CNPJ.replace(/\D/g, ''),
            );

            if (!cliente) {
              console.log('não ja existe');
            } else {
              const currentValorBarra = record.Vencimento.split('/')[1];
              const currentValorTraoco = record.Vencimento.split('-')[1];

              const dados = {
                cliente_id: cliente.id,
                valor: parseFloat(
                  record.Valor.replace('R$ ', '')
                    .replace('.', '')
                    .replace(',', '.'),
                ),
                ...(record.Vencimento !== cliente.cobrancas[0]?.venc && {
                  venc: record.Vencimento.split('/').reverse().join('-'),
                }),
                current: !currentValorBarra
                  ? currentValorTraoco
                  : currentValorBarra,
                status: record.LINK === 'pago' ? false : true,
                ...(record.LINK === 'pago' && {
                  obs: `${cliente.cliente} já efetuou o pagamento diretamente para Allsoft.`,
                }),
                ...(record.LINK !== 'pago' && { link_boleto: record.LINK }),
              };

              const id = cliente.cobrancas[0].id;

              if (id) {
                await this.prismaService.cobranca.update({
                  where: {
                    id,
                  },
                  data: {
                    ...dados,
                  },
                });
              }
            }
          }) // Captura os dados processados
          .on('end', () => resolve('ok')) // Finaliza o processamento
          .on('error', (error) => reject(error)); // Captura erros
      });

      // Destruir o arquivo csv de forma assíncrona
      // await fs.promises.unlink(path);
      return 'ok';
    } catch (error) {
      console.error('Erro ao processar CSV:', error); // Log opcional

      // Garantir que o arquivo seja excluído mesmo em caso de erro
      if (fs.existsSync(path)) {
        await fs.promises.unlink(path);
      }

      throw new HttpException({ message: error.message }, 400);
    }
  }

  async SaveCsv(data: any) {
    try {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log('🚀 ~ CobrancaService ~ SaveCsv ~ element:', element);
      }

      return 'ok';
    } catch (error) {
      throw new HttpException({ message: error.message }, 400);
    }
  }

  async remove(id: number): Promise<DeleteCobranca | ErrorEntity> {
    try {
      await this.prismaService.cobranca.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Cobrança removida com sucesso',
      };
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  //----------------------------------------------------------

  async IsExistClient(cnpj: string) {
    try {
      const req = await this.prismaService.client.findUnique({
        where: {
          cnpj: cnpj.replace(/\D/g, ''),
        },
        include: {
          cobrancas: {
            where: {
              status: true,
            },
            orderBy: {
              venc: 'asc',
            },
          },
        },
      });

      if (!req) {
        return null;
      }
      return req;
    } catch (error) {
      return null;
    }
  }
}
