/* eslint-disable @typescript-eslint/ban-types */
import { Request } from 'express';
import { extname } from 'path';

export const csvFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(new Error('Apenas arquivos CSV são permitidos!'), false);
  }
  callback(null, true);
};

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};
