const router = require('express').Router();
//const passport = require('../config/passport');
const {verifyToken} = require('../config/Auth');
const { signUp, login, loggedUser, logout, verifyUser } = require('../controllers/AuthController');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/verifyUser', verifyUser);
router.get('/loggedUser', verifyToken, loggedUser);
router.post('/edit', login);
router.get('/logout', logout);

module.exports = router