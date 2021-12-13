const Tour = require('../models/tour.model');
const User = require('../models/user.model');

async function getHome(req, res) {
  const allTours = await Tour.find().populate('tourGuide');
  const isLoggedIn = req.session.currentUser ? true : false;
  const userImage = req.session?.currentUser?.image;
  const allToursJSON = JSON.stringify(allTours);
  // console.log(allToursJSON);
  res.render('index', { allTours, isLoggedIn, userImage, allToursJSON });
}

async function getProfile(req, res) {
  // console.log('session', req.session);
  const { err } = req.query;
  const user = await User.findById(req.session.currentUser._id).populate(
    'bookedTours'
  );
  const isLoggedIn = req.session.currentUser ? true : false;
  const userImage = req.session?.currentUser?.image;
  // console.log(user);
  res.render('profile', { user, isLoggedIn, userImage, err });
}

module.exports = { getHome, getProfile };
