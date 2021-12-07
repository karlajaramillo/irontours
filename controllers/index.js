const Tour = require('../models/tour.model');
const User = require('../models/user.model');

async function getHome(req, res) {
  const allTours = await Tour.find().populate('tourGuide');
  const isLoggedIn = req.session.currentUser ? true : false;

  console.log('getHome');
  res.render('index', { allTours, isLoggedIn });
}

async function getProfile(req, res) {
  // console.log('session', req.session);
  const user = await User.findById(req.session.currentUser._id).populate(
    'bookedTours'
  );
  const isLoggedIn = req.session.currentUser ? true : false;
  // console.log(user);
  res.render('profile', { user, isLoggedIn });
}

module.exports = { getHome, getProfile };
