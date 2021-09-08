const router = require('express').Router();
const {verifyToken} = require('../config/auth');
const { createRecipe, findRecipes, editRecipe, deleteRecipe } = require('../controllers/recipeController');
const uploadCloud = require('../config/cloudinary');
const { upload } = require('../controllers/cloudinaryController');

router.post('/create', verifyToken, createRecipe);
router.post('/findRecipes', findRecipes);
router.post('/editRecipe', editRecipe);
router.post('/deleteRecipe', deleteRecipe);
router.post('/upload', uploadCloud.array('imagenesReceta', 16),upload)

module.exports = router