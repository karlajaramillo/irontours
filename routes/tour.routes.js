const router = require('express').Router();

const Tour = require('../models/tour.model');

const User = require('../models/user.model');

const fileUploader = require('../config/cloudinary.config');

const { isAdmin } = require('../middlewares/auth.middlewares');

const { isValidationError, isMongoError } = require('../controllers/auth.controllers')

// CRUD - Create
router.get('/tours/create', isAdmin, async (req, res) => {
  try {
    const guides = await User.find({ role: 'guide' });
    const { err } = req.query; 
    res.render('tour-views/tour-create', { guides, err });
  } catch(err) {
    console.error('error', err);
    next(err);
  }
});

// CRUD - Create
router.post(
  '/tours/create',
  fileUploader.single('tour-cover-image'),
  async (req, res) => {
    try {
      const { name, description, tourGuide } = req.body;
      // console.log(req.body);

      // error handling
      const hasMissingNameDescriptionTourGuide = !name || !description || !tourGuide;
      if (hasMissingNameDescriptionTourGuide) {
        return res.redirect('/tours/create?err=Missing name or description or tour guide');
      }

      const newTour = await Tour.create({
        name,
        description,
        tourGuide,
        image: req.file?.path,
      });
      // console.log(newTour);
      res.redirect('/');
    } catch (err) {
      if (isValidationError(err)) {
        return res.redirect('/tours/create?err=validation error');
      }
      if (isMongoError(err)) {
        return res.redirect('/tours/create?err=Tour name is already in use');
      }
      console.error(err);
      return res.redirect('/tours/create?err=Something went wrong');
    }
  }
);

// CRUD - Read
router.get('/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id).populate('tourGuide');
    const isLoggedIn = req.session.currentUser ? true : false;
    const isAdmin = req.session.currentUser?.role === 'admin' ? true : false;
    const userImage = isLoggedIn ? req.session.currentUser.image : '';
    const isUser = isLoggedIn && !isAdmin;
    const { bookedTours } = isLoggedIn
      ? await User.findById(req.session.currentUser._id)
      : {};
    const isBooked = bookedTours?.includes(id) ? true : false;
    console.log(isBooked);
    res.render('tour-views/tour-details', {
      tour,
      isLoggedIn,
      isAdmin,
      isUser,
      userImage,
      isBooked,
    });
  } catch(err) {
    console.error('error', err);
    next(err);
  }
});


// CRUD - Show Update view - only Admin
router.get('/tours/:id/edit', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { err } = req.query;
    const tour = await Tour.findById(id).populate('tourGuide');
    const guides = await User.find({ role: 'guide' });
    //const user = req.session.currentUser;
    res.render('tour-views/tour-update', { tour, guides, err });
  } catch(err) {
    console.error('error', err);
    next(err);
  }
});

// CRUD - Update - POST
router.post(
  '/tours/:id/edit',
  fileUploader.single('tour-cover-image'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, tourGuide } = req.body;
    //console.log(req.body);

    // error handling
    const hasMissingNameDescriptionTourGuide = !name || !description || !tourGuide;
    if (hasMissingNameDescriptionTourGuide) {
      
      return res.redirect(`/tours/${id}/edit?err=Missing name or description or tour guide`);
    }
    const tour = await Tour.findByIdAndUpdate(
      id,
      {
        name,
        description,
        tourGuide,
        image: req.file?.path,
      },
      { new: true }
    );
    console.log(tour);
    res.redirect('/');
  } catch (err) {
    const { id } = req.params;
    if (isValidationError(err)) {
      return res.redirect(`/tours/${id}/edit?err=validation error`);
    }
    if (isMongoError(err)) {
      return res.redirect(`/tours/${id}/edit?err=Tour name is already in use`);
    }
    console.error(err);
    return res.redirect(`/tours/${id}/edit?err=Something went wrong`);
  } 
}
);

// CRUD - DELETE
router.get('/tours/:id/delete', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndDelete(id);
    res.redirect('/');
  } catch(err) {
    console.error('error', err);
    next(err);
  }
});

module.exports = router;
