function isLoggedIn(req, res, next) {
  if (req.session.currentUser || req.user) {
    // console.log(req.user, 'isLoggedInmiddle');
    return next();
  }
  return res.redirect('/login');
}

function isLoggedOut(req, res, next) {
  if (!req.session.currentUser && !req.user) {
    // console.log(req.user, 'isLoggedOutMiddle');
    return next();
  }
  return res.redirect('/profile');
}

function isAdmin(req, res, next) {
  if (req.session.currentUser.role === 'admin') {
    return next();
  }
  return res.redirect('/profile');
}

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
