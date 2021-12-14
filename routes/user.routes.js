const router = require('express').Router();
const Tour = require('../models/tour.model');
const User = require('../models/user.model');
const fileUploader = require('../config/cloudinary.config');
const {
  isValidationError,
  isMongoError,
} = require('../controllers/auth.controllers');

const emailRegex = /^\S+@\S+\.\S+$/;

function hasEmailWrongFormat(email) {
  return !emailRegex.test(email);
}

router.post(
  '/users/update/:id',
  fileUploader.single('user-profile-image'),
  async (req, res) => {
    try {
      const { name, email } = req.body;
      const { id } = req.params;

      const hasMissingEmailName = !email || !name;
      if (hasMissingEmailName) {
        return res.redirect(`/profile?err=Missing Credentials`);
      }
      if (hasEmailWrongFormat(email)) {
        return res.redirect(`/profile?err=Wrong format`);
      }

      const update = req.file?.path
        ? { name, email, image: req.file.path }
        : { name, email };
      const { password: unUsed, ...newUser } = await User.findByIdAndUpdate(
        id,
        update,
        { new: true }
      ).lean();

      req.session.currentUser = newUser;
      const user = newUser;
      const isLoggedIn = req.session.currentUser ? true : false;
      const userImage = req.session?.currentUser?.image;
      console.log(user);
      res.redirect('/profile');
    } catch (err) {
      if (isValidationError(err)) {
        return res.redirect('/profile?err=validation error');
      }
      if (isMongoError(err)) {
        return res.redirect('/profile?err=Email or username is already in use');
      }
      console.error(err);
      return res.redirect('/profile?err=Something went wrong');
    }
  }
);

// CRUD - Read
router.get('/tours/:id/book', async (req, res) => {
  try {
    let userId;
    if (req.isAuthenticated()) {
      userId = req.user._id;
    } else {
      userId = req.session.currentUser._id;
    }
    const { id } = req.params;

    const bookedTour = await User.findByIdAndUpdate(
      userId,
      {
        $push: { bookedTours: id },
      },
      { new: true }
    );

    // console.log(bookedTour);

    res.redirect('/profile');
  } catch (err) {
    console.error('error', err);
    next(err);
  }
});

router.get('/tours/:id/deleteBooking', async (req, res) => {
  try {
    const { id } = req.params;
    let userId;
    if (req.isAuthenticated()) {
      userId = req.user._id;
    } else {
      userId = req.session.currentUser._id;
    }

    const bookedTour = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { bookedTours: id },
      },
      { new: true }
    );
    console.log(bookedTour);
    res.redirect('/profile');
  } catch (err) {
    console.error('error', err);
    next(err);
  }
});

module.exports = router;
