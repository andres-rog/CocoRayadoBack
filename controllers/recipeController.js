const Recipe = require('../models/Recipe');

//Crear receta
exports.createRecipe = (req, res, next) => {
    let request = req.body;
    request["_owner"]=req.user._id;
    request["_ownerEmail"]=req.user.email;
    console.log("REQUEST",request);

    Recipe.create(request)
    .then(recipe => {
        res.status(200).json({result:recipe})
    })
    .catch( error => res.status(400).json({error}))
}

//Editar receta
exports.editRecipe = (req, res, next) => {
    const {_id} = req.body;
    const {favorites, ...restRequest} = req.body;
    console.log("REQUEST",restRequest);

    Recipe.findOneAndUpdate({$and:[{_id},{_owner:req.user_id}]},restRequest,{new:true})
    .then(recipe => {
        res.status(200).json({result:recipe})
    })
    .catch( error => res.status(400).json({error}))
}

//Eliminar receta
exports.deleteRecipe = (req, res, next) => {
    const {_id} = req.body;
    console.log("REQUEST",restRequest);

    Recipe.findOneAndDelete({$and:[{_id},{_owner:req.user_id}]},restRequest, {new:true})
    .then(() => {
        res.status(200).json({msg:'Receta eliminada'})
    })
    .catch( error => res.status(400).json({error}))
}

//Buscar recetas
exports.findRecipes = (req, res, next) => {
    const {title, tags, ingredientsAmount, orderBy="date", orderDirection=-1, prioritizeFavoriteIngredients=true} = req.body;

    //Por default se ordena por _id (orden/fecha de creacion)
    let sortBy = {_id:orderDirection};
    let queryArray = [];

    if(title) queryArray.push({title});
    if(tags) queryArray.push({tags: {$in:tags}});
    if(ingredientsAmount) queryArray.push({ingredientsAmount});
    if(orderBy==="ingredients") sortBy={ingredientsAmount:orderDirection}
    if(orderBy==="calories") sortBy={caloriesPerServing:orderDirection}
    const request = {$and:queryArray}
    console.log("REQUEST",queryArray);
    console.log("SORT",sortBy);

    //res.status(200).json({msg:"todo chido hasta aqui",sortBy,request});
    Recipe.find(request).sort(sortBy)
    .then(recipesArr => {
        recipesArr.forEach(recipe => {

            //If the user is searching by tag, then look for the recipes with most of the user selected tags
            if(tags){
                let countMatchingTags=0;
                tags.forEach(tag =>{
                    if(recipe.tags.find(recipeTag => recipeTag===tag)) countMatchingTags++;
                })
                recipe.matchedTags=countMatchingTags;
            }

            //If the user is prioritizing recipes by favorite ingredients, then look for the recipes with most of the user favorite ingredients
            if(prioritizeFavoriteIngredients) {
                let countMatchingFavorites=0;
                req.user.favorites.forEach(favorite =>{
                    if(recipe.ingredient.find(recipeIngredient => recipeIngredient===favorite)) countMatchingFavorites++;
                })
                recipe.matchedIngredients=countMatchingFavorites;
            }
        });
        //Sort by matching ingredients and tags
        if(tags) recipesArr.sort((a, b) => (b.matchedTags) - (a.matchedTags));
        if(prioritizeFavoriteIngredients) recipesArr.sort((a, b) => (b.matchedIngredients) - (a.matchedIngredients));

        res.status(200).json({result:recipesArr})
    })
    .catch( error => res.status(400).json({error}))
}