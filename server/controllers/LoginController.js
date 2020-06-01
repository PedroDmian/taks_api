'use struct'

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../models/users');

function login(request, response) {
    let body = request.body;

    let email    = (body.email) ? body.email.toLowerCase() : '';
    let password = (body.password) ? body.password : '';

    if(!email)
        return response.status(401).json({
            status: 'error',
            data: body,
            message: 'El email es necesario',
        });

    if(!password)
        return response.status(401).json({
            status: 'error',
            data: body,
            message: 'La password es necesaria',
        });

    User.findOne({ email }, (error, userDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error en el login',
                error
            });
        
        if(!userDB)
            return response.status(400).json({
                status: 'error',
                message: 'Usuario o contraseña incorrectos',
                error : null,
                data: null
            });

        if(!bcrypt.compareSync(password, userDB.password))
            return response.status(400).json({
                status: 'error',
                message: 'Usuario o contraseña incorrectos',
                error : null,
                data: null
            });

        let APP_SECRET_PASS = process.env.APP_SECRET_PASS || 'examen';
        let APP_EXPIRATION  = process.env.APP_EXPIRATION;

        let token = jwt.sign({
            user: userDB
        }, APP_SECRET_PASS, { expiresIn: APP_EXPIRATION });

        return response.status(200).json({
            status: 'success',
            message: 'Ingreso correctamente',
            error : null,
            data: { token }
        });
    });
}

module.exports = {
    login
};