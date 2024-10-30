import userModel from '../models/user.model.js';
import User from '../entities/user.js';
import asyncHandler from 'express-async-handler';

const get = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const data = await userModel.get(id);

    res.json({
        data: data
    });
})

const getAll = asyncHandler(async (_req, res) => {
    const data = await userModel.getAll();

    res.json({
        data: data
    });
})

const create = asyncHandler(async (req, res) => {
    const { name, lastname, place_residence, occupation, company_name, rol, phone, email, information_contact } = req.body;

    if (!name || !lastname || !place_residence || !occupation || !company_name || !rol || !phone || !email || !information_contact) {
        res.status(401);
        throw new Error('Campos invalidos');
    }

    const user = User.setData({ name: name, lastname: lastname, occupation: occupation, place_residence: place_residence, rol: rol, company_name: company_name, phone: phone, email: email, information_contact: JSON.stringify(information_contact) });

    const result = await userModel.add(user);

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Ocurrio un error, intentalo de nuevo');
    }

    const data = await userModel.get(result.insertId);

    res.status(201).json({
        data: data,
        message: 'Guardado'
    });
})

const update = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, lastname, place_residence, occupation, company_name, rol, phone, email, information_contact, status } = req.body;

    if (!name || !lastname || !place_residence || !rol || !occupation || !company_name || !phone || !email || !information_contact || !status) {
        res.status(401);
        throw new Error('Campos invalidos');
    }

    const user = User.setData({ id: id, name: name, lastname: lastname, occupation: occupation, company_name: company_name, place_residence: place_residence, rol: rol, phone: phone, email: email, information_contact: JSON.stringify(information_contact), status: status });
    const result = await userModel.update(user);

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Ocurrio un error, intentalo de nuevo');
    }

    const data = await userModel.get(result.insertId);

    res.status(201).json({
        data: data,
        message: 'Actualizado'
    });
})

const updateByStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body;

    if (!status) {
        res.status(401);
        throw new Error('Campos invalidos');
    }

    const user = User.setData({ id: id, status: status });
    const result = await userModel.update(user);

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Ocurrio un error, intentalo de nuevo');
    }

    const data = await userModel.get(result.insertId);

    res.status(201).json({
        data: data,
        message: 'Actualizado'
    });
})

const remove = asyncHandler(async (req, res) => {
    const { id } = req.params

    const eliminate = 3
    const user = User.setData({ id: id, status: eliminate });
    const result = await userModel.update(user);

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Ocurrio un error, intentalo de nuevo');
    }

    const data = await userModel.get(result.insertId);

    res.status(201).json({
        data: data,
        message: 'Eliminado'
    });
})

const userController = {
    get,
    getAll,
    create,
    update,
    updateByStatus,
    remove
};

export default userController;