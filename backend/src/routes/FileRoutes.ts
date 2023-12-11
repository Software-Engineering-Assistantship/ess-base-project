import { Router } from 'express';
import multer from 'multer';
import { FileController } from '../controllers';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const FileRouter = Router();

FileRouter.route('/').post([upload.single('file')], FileController.upload);

FileRouter.route('/:key').delete(FileController.delete);

export default FileRouter;
