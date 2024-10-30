import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import webToken from '../middleware/jwtAuth.js';

const routerAuth = Router();

routerAuth.route('/auth').post(authController.login);
routerAuth.route('/auth').get(webToken.verify, authController.reload);

export default routerAuth;
