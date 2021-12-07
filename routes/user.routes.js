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
      const newUser = await User.findByIdAndUpdate(
        id,
        { name, email, image: req.file.path },
        { new: true }
      );
      console.log(newUser);
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
