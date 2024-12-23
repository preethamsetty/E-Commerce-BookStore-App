import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (_error: Error | null, _acceptFile: boolean) => void
): void => {
  if (file.mimetype.startsWith('image/'))
    cb(null, true);
  else
    cb(new Error('Invalid file type'), false);
};

export const upload = multer({ storage, fileFilter });
