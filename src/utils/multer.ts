import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, 'public/uploads');
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.filename + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]
    );
  },
});

const upload = multer({ storage });

export default upload;
