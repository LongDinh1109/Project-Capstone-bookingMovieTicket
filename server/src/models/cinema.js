const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    lowercase: true,
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
    required: false,
  },
  feedbacks: {
    type: [feedback],
    required: false,   
  },

});

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

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
