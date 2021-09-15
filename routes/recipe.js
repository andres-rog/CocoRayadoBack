const router = require('express').Router();
const {verifyToken} = require('../config/auth');
const { createRecipe, findRecipes, findRecipe, editRecipe, deleteRecipe } = require('../controllers/recipeController');
const uploadCloud = require('../config/cloudinary');
const { upload } = require('../controllers/cloudinaryController');

router.post('/create', verifyToken, createRecipe);
router.post('/findRecipes', verifyToken, findRecipes);
router.post('/findRecipe', verifyToken, findRecipe);
router.post('/editRecipe', verifyToken, editRecipe);
router.post('/deleteRecipe', verifyToken, deleteRecipe);
router.post('/upload', verifyToken, uploadCloud.array('imagenesReceta', 16),upload)

module.exports = router