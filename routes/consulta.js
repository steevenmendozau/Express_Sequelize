var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

router.get('/findid/json', function(req, res, next){
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'ID requerido' });
    Foto.findOne({
        where: { id: id },
        attributes: { exclude: ['updatedAt'] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
    })
    .then(foto => {
        if (!foto) return res.status(404).json({ error: 'No encontrado' });
        res.json(foto);
    })
    .catch(error => res.status(400).send(error));
});

router.get('/findid/view', function(req, res, next){
    const id = req.query.id;
    if (!id) return res.render('consulta', { title: 'Consulta', consulta: null, error: 'ID requerido' });
    Foto.findOne({
        where: { id: id },
        attributes: { exclude: ['updatedAt'] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
    })
    .then(foto => {
        if (!foto) return res.render('consulta', { title: 'Consulta', consulta: null, error: 'No encontrado' });
        res.render('consulta', { title: 'Consulta', consulta: foto, error: null });
    })
    .catch(error => res.render('consulta', { title: 'Consulta', consulta: null, error: error.message }));
});

module.exports = router;
