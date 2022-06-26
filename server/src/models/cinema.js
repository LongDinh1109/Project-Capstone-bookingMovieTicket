const mongoose = require('mongoose');

const { Schema } = mongoose;

const feedback = new mongoose.Schema({
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    // lowercase: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
    // lowercase: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    // lowercase: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    // lowercase: true,
  },
  feedbacks: {
    type: [feedback],
    required: false
  }
});



const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
