import { Router } from 'express';
import { storeCredential } from './controller';

export const credentialsRouter = Router();

credentialsRouter.post('/', storeCredential);
