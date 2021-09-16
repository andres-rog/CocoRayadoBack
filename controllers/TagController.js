const Recipe = require('../models/Tag');

//Crear nueva tag
exports.createTag = (req, res, next) => {
    let {title} = req.body;

    Recipe.create(title)
    .then(tag => {
        res.status(200).json({result:tag})
    })
    .catch( error => res.status(400).json({error}))
}