import jwt from "jsonwebtoken";
import constant from "../config/constant.js";
import { userModel } from '../models/index.js';
import asyncHandler from 'express-async-handler';

const ACTIVE = 1;

const getDataByToken = async (auth) => {
    const token = auth.replace(/['"]+/g, '');
    const decode = jwt.verify(token, constant.TOKEN_SECRET);
    const user = await userModel.get(decode.data.id);

    return user;
}

const restrict = (...role) => {
    return asyncHandler(async (req, res, next) => {
        const rol = req.user.rol;

        if (!role.includes(rol)) {
            res.status(401);
            throw Error('Usuario sin permiso');
        }

        next();
    })
}

/**
 * Verify status to user by token
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
const verify = asyncHandler(async (req, res, next) => {
    const auth = req.headers?.authorization;

    if (!auth) {
        res.status(404);
        throw new Error('Token invalido');
    }

    const user = await getDataByToken(auth);

    if (!user) {
        res.status(404);
        throw new Error('Usuario invalido');
    }

    if (user.status !== ACTIVE) {
        res.status(401);
        throw Error('Usuario no autorizado');
    }

    req.user = user;
    next();
})

/**
 * Create Token by user 
 * @param {String} key 
 * @param {User} data 
 * @returns {String} token 
 */
const encode = (key, data) => {
    return jwt.sign({ data }, key);
}

/**
 * @param {String} key 
 * @param {String} token 
 * @returns {String}  
 */
const decode = (key, token) => {
    return jwt.verify(token, key);
}

const webToken = {
    verify,
    restrict,
    encode,
    decode
};

export default webToken;