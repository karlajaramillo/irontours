const router = require('express').Router();
const { getHome, getProfile } = require('../controllers/index');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth.middlewares');

router.get('/', getHome).get('/profile', isLoggedIn, getProfile);

module.exports = router;
