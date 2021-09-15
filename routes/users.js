
const router = require('express').Router();
const {verifyToken} = require('../config/auth');
const { addRecipeToFavorites, removeRecipeFromFavorites } = require('../controllers/userController');

router.post('/addFavoriteRecipe', verifyToken, addRecipeToFavorites);
router.post('/removeFavoriteRecipe', verifyToken, removeRecipeFromFavorites);

module.exports = router;