var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;


router.get('/get', function(req, res, next){
    let id = req.query.id;

    Foto.findOne({
        where: {id: id},
        attributes: {exclude: ['updatedAt', 'createdAt']},
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: {attributes: []}
        }],
    })
    .then(foto => {
        res.json(foto);
    })
    .catch(error => res.status(400).send(error))
})


router.post('/save', function(req, res, next){
    let {titulo, descripcion, calificacion,ruta} = req.body;

    Foto.create({
        titulo: titulo,
        descripcion: descripcion,
        calificacion: parseFloat(calificacion),
        ruta: ruta,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(foto => {
        res.json(foto);
    })
    .catch(error => res.status(400).send(error))
})

router.put('/update', function(req, res, next){
    let {id, titulo, descripcion, calificacion,ruta} = req.body;

    Foto.update({
        titulo: titulo,
        descripcion: descripcion,
        calificacion: parseFloat(calificacion),
        ruta: ruta,
        updatedAt: new Date()
    })
    .then(foto => {
        res.json(foto);
    })
    .catch(error => res.status(400).send(error))
})

router.delete('/delete', function(req, res, next){
    let {id} = req.body;

    Foto.destroy({where: {id: id}})
})



module.exports = router;

