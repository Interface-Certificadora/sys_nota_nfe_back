import { HttpException, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ErrorEntity } from 'src/entities/error.entity';
import { Certificate } from './entities/certificate.entity';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { execSync } from 'child_process';

@Injectable()
export class CertificateService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateCertificateDto): Promise<Certificate | ErrorEntity> {
    try {
      const req = await this.prismaService.certificate.create({
        data: {
          ...data,
          clientId: Number(data.clientId),
        },
        include: {
          Client: true,
        },
      });

      return plainToClass(Certificate, req);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findAll(): Promise<Certificate[] | ErrorEntity> {
    try {
      const req = await this.prismaService.certificate.findMany({
        include: {
          Client: true,
        },
      });
      return req.map((i: any) => plainToClass(Certificate, i));
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async findOne(id: string): Promise<Certificate | ErrorEntity> {
    try {
      const req = await this.prismaService.certificate.findUnique({
        where: {
          id,
        },
        include: {
          Client: true,
        },
      });

      return plainToClass(Certificate, req);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async update(
    id: string,
    dados: UpdateCertificateDto,
  ): Promise<Certificate | ErrorEntity> {
    try {
      const req = await this.prismaService.certificate.update({
        where: {
          id,
        },
        data: dados,
        include: {
          Client: true,
        },
      });

      return plainToClass(Certificate, req);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async remove(id: string): Promise<ErrorEntity> {
    try {
      await this.prismaService.certificate.delete({
        where: {
          id,
        },
      });

      return { message: 'Certificado removido com sucesso' };
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async uploadFile(file: Express.Multer.File, data: CreateCertificateDto) {
    try {
      const clientId = data.clientId;
      const filePath = path.resolve(__dirname, `../../../${file.path}`);

      const Certificado = this.extractCertificateInfo(filePath, data.password);
      console.log(
        '🚀 ~ CertificateService ~ uploadFile ~ Certificado:',
        Certificado,
      );

      const Iscliente = await this.IsCliente(clientId);
      if (!Iscliente) {
        const create = await this.prismaService.certificate.create({
          data: {
            ...data,
            validade: Certificado.expiracao,
            ...file,
          },
        });

        const update = await this.prismaService.certificate.update({
          where: {
            id: create.id,
          },
          data: {
            url: `http://api.notanfe.com.br/certificate/download/${create.id}`,
          },
        });

        return plainToClass(Certificate, update);
      }

      if (Iscliente.length > 0) {
        await this.prismaService.certificate.updateMany({
          where: {
            id: {
              in: Iscliente.map((i: any) => i.id),
            },
          },
          data: {
            status: false,
          },
        });
      }
      //fazer update en todos os objetos do array
      const create = await this.prismaService.certificate.create({
        data: {
          ...data,
          validade: Certificado.expiracao,
          ...file,
        },
      });

      const update = await this.prismaService.certificate.update({
        where: {
          id: create.id,
        },
        data: {
          url: `http://api.notanfe.com.br/certificate/download/${create.id}`,
        },
      });

      return plainToClass(Certificate, update);
    } catch (error) {
      console.log(error);
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  }

  async download(id: string, res: Response) {
    try {
      // Buscar o certificado no banco de dados pelo ID
      const certificate = await this.prismaService.certificate.findUnique({
        where: { id },
      });

      if (!certificate) {
        throw new HttpException('Certificado não encontrado', 404);
      }

      // Caminho completo do arquivo
      const filePath = path.resolve(`./${certificate.path}`);

      // Verificar se o arquivo existe
      if (!fs.existsSync(filePath)) {
        throw new HttpException('Arquivo não encontrado', 404);
      }

      // Enviar o arquivo para o cliente com o nome original
      return res.download(filePath, certificate.originalname);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  //--------------------------------------------
  async IsCliente(id: number) {
    try {
      const req = await this.prismaService.certificate.findMany({
        where: {
          clientId: id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (req.length < 0) {
        return null;
      }
      return req;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  extractCertificateInfo(filePath: string, password: string): any {
    try {
      //
      const details = execSync(
        `openssl pkcs12 -legacy -in ${filePath} -clcerts -nokeys -password pass:${password} | openssl x509 -dates -noout`,
        {
          encoding: 'utf-8',
          shell: '/bin/bash',
        },
      );
      const [notBefore, notAfter] = details.split('\n');
      const notBeforeDate = new Date(notBefore.split('=')[1].trim())
        .toISOString()
        .split('T')[0];
      const notAfterDate = new Date(notAfter.split('=')[1].trim())
        .toISOString()
        .split('T')[0];
      return {
        criacao: notBeforeDate,
        expiracao: notAfterDate,
      };
    } catch (error) {
      console.error('Erro ao processar o certificado:', error);
      return {
        error: 'Falha ao obter informações do certificado',
        details: error,
      };
    }
  }
}
