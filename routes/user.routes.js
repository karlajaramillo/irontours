const router = require('express').Router();
const Tour = require('../models/tour.model');
const User = require('../models/user.model');
const fileUploader = require('../config/cloudinary.config');

router.post(
  '/users/update/:id',
  fileUploader.single('user-profile-image'),
  async (req, res) => {
    try {
      const { name, email } = req.body;
      const { id } = req.params;
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
      //   console.log(newUser);
      res.render('profile', { user, isLoggedIn, userImage });
    } catch (err) {
      console.log(err);
    }
  }
);

// CRUD - Read
router.get('/tours/:id/book', async (req, res) => {
  const userId = req.session.currentUser._id;
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
});

router.get('/tours/:id/deleteBooking', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.currentUser._id;

  const bookedTour = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { bookedTours: id },
    },
    { new: true }
  );
  console.log(bookedTour);
  res.redirect('/profile');
});

module.exports = router;
