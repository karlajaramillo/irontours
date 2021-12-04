const { Schema, model } = require('mongoose');

const TourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a tour name'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minLength: 500,
  },
  image: {
    type: String,
    default: '/images/tours/default-tour.jpg',
  },
  tourGuide: {
    type: Schema.Type.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Tour', TourSchema);
