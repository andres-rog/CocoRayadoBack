const router = require('express').Router();
//const passport = require('../config/passport');
const {verifyToken} = require('../config/auth');
const { signUp, login, loggedUser, logout, verifyUser } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/verifyUser', verifyUser);
router.get('/loggedUser', verifyToken, loggedUser);
router.post('/edit', login);
router.get('/logout', logout);

module.exports = router