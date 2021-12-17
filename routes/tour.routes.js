const router = require('express').Router();
const Tour = require('../models/tour.model');
const User = require('../models/user.model');
const fileUploader = require('../config/cloudinary.config');
const { isAdmin } = require('../middlewares/auth.middlewares');
const axios = require('axios');

const {
  isValidationError,
  isMongoError,
} = require('../controllers/auth.controllers');

// axios
async function getWeather(city) {
  try {
    const apiKey = process.env.WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await axios.get(url);
    //console.log(response);
    //console.log(response.data)
    const kelvinToCelsius = (+response.data.main.temp - 273.15).toFixed();
    const weather = {
      desc: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,

      temp: kelvinToCelsius,
    };
    //console.log(weather)
    return weather;
  } catch (error) {
    console.error(error);
  }
}

// CRUD - Create
router.get('/tours/create', isAdmin, async (req, res) => {
  try {
    let isLoggedIn = true;
    let userImage = req.session?.currentUser?.image;

    const guides = await User.find({ role: 'guide' });
    const { err } = req.query;
    res.render('tour-views/tour-create', {
      guides,
      isLoggedIn,
      userImage,
      err,
    });
  } catch (err) {
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
      const { name, description, tourGuide, lat, long } = req.body;
      // console.log(req.body);

      // error handling
      const hasMissingNameDescriptionTourGuide =
        !name || !description || !tourGuide || !lat || !long;
      if (hasMissingNameDescriptionTourGuide) {
        return res.redirect('/tours/create?err=Missing credentials');
      }
      const mapData = {
        type: 'Point',
        coordinates: [long, lat],
      };
      const newTour = await Tour.create({
        name,
        description,
        tourGuide,
        mapData,
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
//30.835888237339596, -82.7599515725407
// CRUD - Read
router.get('/tours/:id', async (req, res) => {
  try {
    let isLoggedIn;
    let userImage;
    let isAdmin;
    if (req.isAuthenticated()) {
      isLoggedIn = true;
      userImage = req.user.image;
      isAdmin = false;
    } else {
      isLoggedIn = req.session.currentUser ? true : false;
      userImage = isLoggedIn ? req.session.currentUser.image : '';
      isAdmin = req.session.currentUser?.role === 'admin' ? true : false;
    }
    const currentUser = req.isAuthenticated()
      ? req.user
      : req.session.currentUser;
    const { id } = req.params;
    const tour = await Tour.findById(id).populate('tourGuide');
    const isUser = isLoggedIn && !isAdmin;
    const { bookedTours } = isLoggedIn
      ? await User.findById(currentUser._id)
      : {};
    const isBooked = bookedTours?.includes(id) ? true : false;
    console.log(isBooked);

    const today = new Date();
    //const date = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = days[today.getDay()];

    const event = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = event.toLocaleDateString('en-US', options);

    // axios
    const weather = await getWeather(tour.name);

    res.render('tour-views/tour-details', {
      tour,
      isLoggedIn,
      isAdmin,
      isUser,
      userImage,
      isBooked,
      weather,
      date,
      dayName,
    });
  } catch (err) {
    console.error('error', err);
    next(err);
  }
});

// CRUD - Show Update view - only Admin
router.get('/tours/:id/edit', isAdmin, async (req, res) => {
  try {
    let isLoggedIn = true;
    let userImage = req.session?.currentUser?.image;

    const { id } = req.params;
    const { err } = req.query;
    const tour = await Tour.findById(id).populate('tourGuide');
    const guides = await User.find({ role: 'guide' });
    //const user = req.session.currentUser;
    res.render('tour-views/tour-update', {
      tour,
      guides,
      isLoggedIn,
      userImage,
      err,
    });
  } catch (err) {
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
      const { name, description, tourGuide, lat, long } = req.body;
      //console.log(req.body);

      // error handling
      const hasMissingNameDescriptionTourGuide =
        !name || !description || !tourGuide || !lat || !long;
      if (hasMissingNameDescriptionTourGuide) {
        return res.redirect(`/tours/${id}/edit?err=Missing credentials`);
      }

      const mapData = {
        type: 'Point',
        coordinates: [long, lat],
      };

      const tour = await Tour.findByIdAndUpdate(
        id,
        {
          name,
          description,
          tourGuide,
          mapData,
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
        return res.redirect(
          `/tours/${id}/edit?err=Tour name is already in use`
        );
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
  } catch (err) {
    console.error('error', err);
    next(err);
  }
});

// CRUD - Update tour - add locations - only Admin
router.get('/tours/:id/addLocations', isAdmin, async (req, res) => {
  try {
    let isLoggedIn = true;
    let userImage = req.session?.currentUser?.image;

    const { id } = req.params;
    const { err } = req.query;
    const tour = await Tour.findById(id).populate('tourGuide');
    //const user = req.session.currentUser;
    //res.send('hello')
    res.render('tour-views/tour-addLocations', {
      tour,
      isLoggedIn,
      userImage,
      err,
    });
  } catch (err) {
    console.error('error', err);
    next(err);
  }
});

// CRUD
///tours/{{_id}}/addLocations
router.post('/tours/:id/addLocations', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, long, description } = req.body;
    console.log(lat, long, description);

    const location = {
      description,
      coordinates: [long, lat],
    };

    console.log(location);
    const newTour = await Tour.findByIdAndUpdate(
      id,
      {
        $push: { locations: location },
      },
      { new: true }
    );

    res.redirect(`/tours/${id}`);
  } catch (err) {
    console.error('error', err);
    next(err);
  }
});

module.exports = router;
