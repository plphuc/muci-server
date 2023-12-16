import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import path from 'path';
import { promisify } from 'util';

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    const match = ['image/png', 'image/jpg', 'image/jpeg'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'photos',
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

const uploadFile = multer({storage}).single('file');

export default promisify(uploadFile);