const router = require('express').Router();
//const passport = require('../config/passport');
const {verifyToken} = require('../config/auth');
const { signUp, login, loggedUser, logout } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/loggedUser', verifyToken, loggedUser);
router.post('/edit', login);
router.get('/logout', logout);

module.exports = router