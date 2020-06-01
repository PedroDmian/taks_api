'use struct'

const bcrypt = require('bcrypt');
const User   = require('../models/users');

function list(request, response) {
    User.find({ active: 1 }).exec((error, usersDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error en el listado',
                error
            });

        return response.status(200).json({
            status: 'success',
            data: usersDB,
            message: 'Lista de usuarios'
        });
    })
}

function save(request, response) {
    let body = request.body;

    let password = bcrypt.hashSync(body.password, 10);

    let user = new User({
        username : body.username,
        email: body.email,
        password,
        name: body.name,
        lastname: body.lastname,
        image: 'default.png',
        active: 1        
    });

    user.save((error, userDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error',
                error
            });

        return response.status(200).json({
            status: 'success',
            message: 'Se guardo correctamente un usuario',
            data: userDB
        });
    });
}

function update(request, response) {
    let body = request.body;
    let id   = body.id;

    if(typeof id == 'undefined')
        return response.status(401).json({
            status: 'error',
            data: null,
            message: 'El identificador es necesario',
            error : {
                errors : ['el identificador es necesario']
            }
        });

    User.findByIdAndUpdate(id, body, { new: true }, (error, userDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error',
                error
            });

        return response.status(200).json({
            status: 'success',
            message: 'Se actualizo correctamente el usuario',
            data: userDB
        });
    });
}

function deleted(request, response) {
    let body = request.params;
    let id   = body.id;

    if(typeof id == 'undefined')
        return response.status(401).json({
            status: 'error',
            data: null,
            message: 'El identificador es necesario',
            error : {
                errors : ['el identificador es necesario']
            }
        });

    User.findByIdAndUpdate(id, { active: 0 }, { new: true },(error, userDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error al eliminiar el usuario',
                error
            });

        if(!userDB.active)
            return response.status(200).json({
                status: 'success',
                message: 'El usuario ya se encuentra eliminado',
                data: userDB
            });

        return response.status(200).json({
            status: 'success',
            message: 'Se elimino correctamente un usuario',
            data: userDB
        });
    });
}

module.exports = {
    save,
    list,
    update,
    deleted
};