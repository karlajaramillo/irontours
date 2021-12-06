
const Tour = require("../models/tour.model");

async function getHome (req, res) {
  const allTours = await Tour.find().populate('tourGuide');

  console.log('getHome');
  res.render('index', { allTours });
}

function getPrivate(req, res) {
  console.log('session', req.session);
  res.render('private');
}

module.exports = { getHome, getPrivate };
