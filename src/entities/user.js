import bcrypt from 'bcryptjs';

export default class User {
    #password;
    #reset_password;

    /**
    * @constructor
    * @param {number} id
    * @param {String?} name
    * @param {String?} lastname
    * @param {String?} occupation
    * @param {String?} company_name
    * @param {String?} place_residence
    * @param {String?} phone
    * @param {String?} email
    * @param {String?} password
    * @param {JSON} information_contact
    * @param {number} rol
    * @param {number} status
    * @param {Date?} created
    * @param {Date?} updated
    */
    constructor(id, name, lastname, occupation, company_name, place_residence, phone, email, password, information_contact, rol, status, created, updated) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.occupation = occupation;
        this.company_name = company_name;
        this.place_residence = place_residence;
        this.phone = phone && this.#replaceFilter(phone);
        this.email = email;
        this.#password = password && this.#replacePasswordHash(password);
        this.#reset_password = this.#generedResetPassword();
        this.information_contact = information_contact;
        this.rol = rol;
        this.status = status;
        this.created_at = created;
        this.updated_at = updated;
    }

    /**
     * @param {String?} phone 
     * @returns {String}
     */
    #replaceFilter(phone = '') {
        return phone.replace(/[^\d]/g, '');
    }

    /**
     * @param {String?} phone 
     * @returns {Boolean}
     */
    verify(phone = '') {
        return (phone.length > 9) ? true : false;
    }

    #generedResetPassword() {
        const reset = (Math.random() + 1).toString(36).substring(4);
        return reset.replace(/\s+/g, '');
    }

    /**
    * @param {String || ''} password
    * @returns {String} 
    */
    #replacePasswordHash(password) {
        return password.replace('$2y$', '$2a$');
    }

    /**
    * @param {String || ''} password
    * @returns {Boolean} 
    */
    comparePassword(password) {
        return bcrypt.compareSync(password, this.#password);
    }

    /**
    * @param {String || ''} password
    */
    generedPasswordHash(password) {
        const saltRounds = 10;
        this.#password = bcrypt.hashSync(password, saltRounds);
    }

    /**
    * @returns {String} 
    */
    getPassword() {
        return this.#password;
    }

    /**
    * @returns {String} 
    */
    getResetPassword() {
        return this.#reset_password;
    }

    /*
    status
    0:Desconocido
    1:Activo
    2:Desactivado
    3:Eliminado

    rol
    0:Desconocido
    1:Administrador
    2:Usuario
    */

    /**
    * @param {object} data {id, name, lastname, occupation, company_name, place_residence, phone, email, password, information_contact, drol, status, created_at, updated_at}
    * @returns {User} 
    */
    static setData = (data) => {
        return new User(data.id, data.name, data.lastname, data.occupation, data.company_name, data.place_residence, data.phone, data.email, data.password, data.information_contact, data.rol, data.status, data.created_at, data.updated_at);
    }
}