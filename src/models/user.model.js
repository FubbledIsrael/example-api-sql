import connection from '../config/database.js';
import User from '../entities/user.js';

/**
 * 
 * @param {number} id 
 * @returns {Promise<User>} user data
 */
const get = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM `users` WHERE `id` = ?',
            [id],
            (err, rows) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    const data = rows[0] && User.setData(rows[0]);
                    resolve(data);
                }
            }
        );
    });
}

/**
 * 
 * @param {String} email 
 * @returns {Promise<User>} user data
 */
const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [email],
            (err, rows) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    const data = rows[0] && User.setData(rows[0]);
                    resolve(data);
                }
            }
        );
    });
}

/**
 * 
 * @returns {Promise<User[]>} user data[]
 */
const getAll = () => {
    return new Promise((resolve, reject) => {
        connection.execute(
            'SELECT * FROM `users`',
            (err, rows) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    const data = rows.map((row) => User.setData(row));
                    resolve(data);
                }
            }
        );
    });
}

/**
 * 
 * @param {User} user 
 * @returns {Promise<object>} results
 */
const add = (user) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `users`(`name`, `lastname`, `occupation`, `company_name`, `reset_password`, `rol`, `place_residence`, `phone`, `email`, `information_contact`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.name, user.lastname, user.occupation, user.company_name, user.getResetPassword(), user.rol, user.place_residence, user.phone, user.email, user.information_contact],
            (err, rows) => {
                (err) ? reject(new Error(err.message)) : resolve(rows);
            }
        );
    });
}

/**
 * 
 * @param {User} user 
 * @returns {Promise<object>} results
 */
const update = (user) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE `users` SET `name` = IFNULL(?, `name`), `lastname` = IFNULL(?, `lastname`), `occupation` = IFNULL(?, `occupation`), `company_name` = IFNULL(?, `company_name`), `place_residence` = IFNULL(?, `place_residence`), `phone` = IFNULL(?, `phone`), `email` = IFNULL(?, `email`), `password` = IFNULL(?, `password`), `rol` = IFNULL(?, `rol`), `status` = IFNULL(?, `status`), `information_contact` = IFNULL(?, `information_contact`) WHERE `id` = ?',
            [user.name, user.lastname, user.occupation, user.company_name, user.place_residence, user.phone, user.email, user.getPassword(), user.rol, user.status, user.information_contact, user.id],
            (err, rows) => {
                (err) ? reject(new Error(err.message)) : resolve(rows);
            }
        );
    });
}

const userModel = {
    get,
    getByEmail,
    getAll,
    add,
    update
};

export default userModel;