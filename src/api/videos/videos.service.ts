import { HttpException, Injectable } from '@nestjs/common';
import { ErrorEntity } from 'src/entities/error.entity';
import * as fs from 'fs';

@Injectable()
export class VideosService {
  findAll() {
    try {
      // listar todos os videos que estão na pasta /var/www/html/ar_interface/assets/notanfe/
      const lista = fs
        .readdirSync('/var/www/html/ar_interface/assets/notanfe')
        .filter((file) => file.endsWith('.mp4'));

      const retorno = lista.map((i: any, index: number) => {
        //pegar o i e retirar o .mp4 e depois substituir o _ por espaco
        const tituloNome = i.replace('.mp4', '').replace('_', ' ');
        return {
          id: index + 1,
          titulo: tituloNome,
          url: `https://arinterface.com.br/assets/notanfe/${i}`,
        };
      });
      return retorno.length > 0 ? retorno : [];
    } catch (error) {
      const retorno: ErrorEntity = {
        message: 'Falha ao criar o usuário',
      };
      throw new HttpException(retorno, 500);
    }
  }
}
