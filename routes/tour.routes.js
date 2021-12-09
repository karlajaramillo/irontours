const router = require('express').Router();

const Tour = require('../models/tour.model');

const User = require('../models/user.model');

const fileUploader = require('../config/cloudinary.config');

const { isAdmin } = require('../middlewares/auth.middlewares');

// CRUD - Create
router.get('/tours/create', isAdmin, async (req, res) => {
  const guides = await User.find({ role: 'guide' });

  res.render('tour-views/tour-create', { guides });
});

// CRUD - Create
router.post(
  '/tours/create',
  fileUploader.single('tour-cover-image'),
  async (req, res) => {
    try {
      const { name, description, tourGuide } = req.body;
      // console.log(req.body);

      const newTour = await Tour.create({
        name,
        description,
        tourGuide,
        image: req.file.path,
      });
      // console.log(newTour);
      res.redirect('/');
    } catch (error) {
      console.error(error);
    }
  }
);

// CRUD - Read
router.get('/tours/:id', async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id).populate('tourGuide');
  const isLoggedIn = req.session.currentUser ? true : false;
  const isAdmin = req.session.currentUser?.role === "admin" ? true : false;
  console.log(tour)
  console.log(tour.tourGuide.name)
  res.render('tour-views/tour-details', {
    tour,
    isLoggedIn,
    isAdmin
  });
});

// CRUD - Update - only Admin
router.get('/tours/:id/edit', isAdmin, async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id).populate('tourGuide');
  const guides = await User.find({ role: 'guide' });
  //const user = req.session.currentUser;
  res.render('tour-views/tour-update',  { tour, guides});
});

// CRUD - Update - POST



// CRUD - Update - DELETE

module.exports = router;
