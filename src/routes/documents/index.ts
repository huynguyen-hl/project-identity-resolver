import { Router } from 'express';
import { storeDocument } from './controller';

export const documentsRouter = Router();

documentsRouter.post('/', storeDocument);
