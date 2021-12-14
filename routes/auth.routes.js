const router = require('express').Router();
const passport = require('passport');
const {
  getLogin,
  getSignup,
  signup,
  login,
  logout,
} = require('../controllers/auth.controllers');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth.middlewares');

router
  .get('/signup', isLoggedOut, getSignup)
  .get('/login', isLoggedOut, getLogin)
  .get('/logout', isLoggedIn, logout)
  .post('/signup', isLoggedOut, signup)
  .post('/login', isLoggedOut, login)
  .post('/logout', isLoggedIn, logout)
  .get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })
  )
  .get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // console.log(req.user, 'authRoute31');
      // req.session.currentUser = req.user;
      res.redirect('/login');
    }
  );
// .get('/auth/logout', async (req, res) => {
//   await req.session.destroy();
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
