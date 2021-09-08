const router = require('express').Router();

const uploadCloud = require('../config/cloudinary');
const { upload } = require('../controllers/cloudinaryController');

router.post('/upload', uploadCloud.single('img'),upload)

module.exports = router;
