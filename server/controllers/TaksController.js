'use struct'

const bcrypt = require('bcrypt');
const Taks   = require('../models/taks');

function list(request, response) {
    let user = request.user;
    let _id  = user._id;

    Taks.find({active: 1, user_id: _id }).exec((error, taksDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error en las tareas',
                error
            });

        return response.status(200).json({
            status: 'success',
            data: taksDB,
            message: 'Lista de tareas'
        });
    });
}

function save(request, response) {
    let body = request.body;
    let user = request.user;
    let _id  = user._id;
    
    let taks = new Taks({
        user_id : _id,
        image: 'not_image.png',
        name: body.name,
        description: body.description,
        active: 1
    });

    taks.save((error, taksDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error',
                error
            });
        
        return response.status(200).json({
            status: 'success',
            message: 'Se guardo correctamente una tarea',
            data: taksDB
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

    Taks.findByIdAndUpdate(id, body, { new: true }, (error, taksDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error',
                error
            });

        return response.status(200).json({
            status: 'success',
            message: 'Se actualizo correctamente la tarea',
            data: taksDB
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

    Taks.findByIdAndUpdate(id, { active: 0 }, { new: true }, (error, taksDB) => {
        if(error)
            return response.status(500).json({
                status: 'error',
                data: null,
                message: 'Ocurrio un error al eliminiar la tarea',
                error
            });

        // if(!taksDB.active)
        //     return response.status(200).json({
        //         status: 'success',
        //         message: 'La tarea ya se encuentra eliminado',
        //         data: taksDB
        //     });

        return response.status(200).json({
            status: 'success',
            message: 'Se elimino correctamente la tarea',
            data: taksDB
        });
    });
}

module.exports = {
    list,
    save,
    update,
    deleted
};