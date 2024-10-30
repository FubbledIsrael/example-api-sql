import { Router } from "express";
import userController from '../controllers/user.controller.js';
import webToken from "../middleware/jwtAuth.js";

export const routerUser = Router();

const ADMIN = 1

routerUser.route('/user/:id')
    .put(webToken.verify, webToken.restrict(ADMIN), userController.update)
    .patch(webToken.verify, webToken.restrict(ADMIN), userController.updateByStatus)
    .delete(webToken.verify, webToken.restrict(ADMIN), userController.remove)
    .get(webToken.verify, userController.get);

routerUser.route('/user')
    .get(webToken.verify, userController.getAll)
    .post(webToken.verify, webToken.restrict(ADMIN), userController.create);

export default routerUser;