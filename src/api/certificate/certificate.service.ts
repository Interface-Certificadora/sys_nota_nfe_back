import { HttpException, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ErrorEntity } from 'src/entities/error.entity';
import { Certificate } from './entities/certificate.entity';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CertificateService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateCertificateDto): Promise<Certificate | ErrorEntity> {
    try {
      const req = await this.prismaService.certificate.create({
        data,
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

  async uploadFile(file: any, data: CreateCertificateDto) {
    try {
      const clientId = data.clientId;

      const Iscliente = await this.IsCliente(clientId);
      if (!Iscliente) {
        const create = await this.prismaService.certificate.create({
          data: {
            ...data,
            url: file.path,
          },
        });

        const update = await this.prismaService.certificate.update({
          where: {
            id: create.id,
          },
          data: {
            urlExt: `http://api.notanfe.com.br/certificate/download/${create.id}`,
          },
        });

        return plainToClass(Certificate, update);
      }

      //fazer update en todos os objetos do array
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

      const create = await this.prismaService.certificate.create({
        data: {
          ...data,
          url: file.path,
        },
      });

      const update = await this.prismaService.certificate.update({
        where: {
          id: create.id,
        },
        data: {
          urlExt: `http://api.notanfe.com.br/certificate/download/${create.id}`,
        },
      });

      return plainToClass(Certificate, update);
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  } // TODO: implementar upload de arquivo

  async download(id: string) {
    try {
      //pesquisar o id
      const req = await this.prismaService.certificate.findUnique({
        where: {
          id,
        },
      });
      //buscar o arquivo no diretório usando a propriedade url
      const file = req.url;
      // enviar o arquivo para o retorno
      return file;
    } catch (error) {
      const retorno: ErrorEntity = {
        message: error.message,
      };
      throw new HttpException(retorno, 400);
    }
  } // TODO: implementar download de arquivo

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
}
