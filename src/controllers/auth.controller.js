import constant from '../config/constant.js';
import { webToken } from '../middleware/index.js';
import userModel from '../models/user.model.js';
import asyncHandler from 'express-async-handler';

const ACTIVED = 1;

const reload = asyncHandler(async (req, res) => {
    res.json({
        data: req.user
    });
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.getByUsername(username);

    if (!user) {
        res.status(404);
        throw new Error('Usuario/Contraseña invalido');
    }

    if (!user.comparePassword(password)) {
        res.status(400);
        throw new Error('Contraseña invalido');
    }

    if (user.status !== ACTIVED) {
        res.status(400);
        throw new Error('Usuario no Autorizado');
    }

    const token = webToken.encode(constant.TOKEN_SECRET, user);

    res.json({
        message: 'Bienvenido',
        token_session: token,
        data: user
    });
})

const authController = {
    reload,
    login,
};

export default authController;