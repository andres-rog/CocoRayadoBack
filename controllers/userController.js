const User = require('../models/User');
const Recipe = require('../models/Recipes');
const { favs10mail, favs100mail, favs1000mail } = require('../config/nodemailer');

//Editar usuario
exports.edit = (req, res, next) => {
    const {_id} = req.user;
    const{role,...restUser} = req.body;

    User.findByIdAndUpdate(_id,restUser,{new:true})
    .then(user => {
      res.status(200).json({result:user})
    })
    .catch( error => res.status(400).json({error}));
}

//Agregar receta a favoritos
exports.addRecipeToFavorites = (req, res, next) => {
    const {_id} = req.user;
    const{_recipeId} = req.body;

    User.findByIdAndUpdate(_id,{$push:{_favorites:_recipeId}},{new:true})
    .then(user => {
        //Actualizar cantidad de favoritos en receta
        Recipe.findByIdAndUpdate({_id:_recipeId}, {$inc: { favorites: 1 }}, {new:true})
        .then(recipe => {
            switch (recipe.favorites) {
                case 10:
                    favs10mail(recipe._ownerEmail, recipe.title);
                case 100:
                    favs100mail(recipe._ownerEmail, recipe.title);
                case 1000:
                    favs1000mail(recipe._ownerEmail, recipe.title);
            }
        })
        res.status(200).json({result:user})
    })
    .catch( error => res.status(400).json({error}));
}

//Remover receta de favoritos
exports.removeRecipeFromFavorites = (req, res, next) => {
    const {_id} = req.user;
    const{_recipeId} = req.body;

    User.findByIdAndUpdate(_id,{$pull:{_favorites:_recipeId}},{new:true})
    .then(user => {
      res.status(200).json({result:user})
    })
    .catch( error => res.status(400).json({error}));
}

//Obtain favorites recipes list
exports.listFavorites = (req, res, next) => {
    const {_favoritos} = req.user;

    Recipe.findByIdAndUpdate({_id:{$in:_favoritos}})
    .then(favorites => {
      res.status(200).json({result:favorites})
    })
    .catch( error => res.status(400).json({error}));
}

//Obtain list of recipes made by user
exports.listRecipes = (req, res, next) => {
    const {_id} = req.user;

    Recipe.find({_ownerId:_id})
    .then(recipes => {
      res.status(200).json({result:recipes})
    })
    .catch( error => res.status(400).json({error}));
}