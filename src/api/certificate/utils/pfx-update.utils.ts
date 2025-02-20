/* eslint-disable @typescript-eslint/ban-types */
import { Request } from 'express';
import { extname } from 'path';

export const pfxFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file.originalname.match(/\.(pfx)$/)) {
    return callback(new Error('Apenas arquivos pfx são permitidos!'), false);
  }
  callback(null, true);
};

export const editFileNamePfx = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  //pegar o nome original sem a extensão
  const filetName = file.originalname.split('.')[0].replace(/ /g, '_');
  const fileExtName = extname(file.originalname);
  const randomName = Array(15)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${filetName}-${randomName}${fileExtName}`);
};
