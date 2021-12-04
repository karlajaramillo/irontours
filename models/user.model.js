const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide a valid email address'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
  },
  role: {
    type: String,
    enum: ['admin', 'guide', 'user'],
    default: 'user',
  },
  image: {
    type: String,
    default: '/images/users/default.jpg',
  },
  bookedTours: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
  ],
});

module.exports = model('User', UserSchema);
