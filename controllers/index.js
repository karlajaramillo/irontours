const Tour = require('../models/tour.model');
const User = require('../models/user.model');

async function getHome(req, res) {
  const allTours = await Tour.find().populate('tourGuide');
  let isLoggedIn;
  let userImage;
  if (req.isAuthenticated()) {
    isLoggedIn = true;
    userImage = req.user.image;
  } else {
    isLoggedIn = req.session.currentUser ? true : false;
    userImage = req.session?.currentUser?.image;
    // const allToursJSON = JSON.stringify(allTours);
    // console.log(allToursJSON);
  }
  res.render('index', { allTours, isLoggedIn, userImage });
}

async function getProfile(req, res) {
  // console.log('session', req.session);
  const { err } = req.query;
  let isLoggedIn;
  let userImage;
  let user;
  if (req.isAuthenticated()) {
    user = await User.findById(req.user._id).populate('bookedTours');
    isLoggedIn = true;
    userImage = req.user.image;
    console.log(isLoggedIn, user);
  } else {
    user = await User.findById(req.session.currentUser._id).populate(
      'bookedTours'
    );
    isLoggedIn = req.session.currentUser ? true : false;
    userImage = req.session?.currentUser?.image;
  }
  // console.log(user);
  res.render('profile', { user, isLoggedIn, userImage, err });
}

module.exports = { getHome, getProfile };
