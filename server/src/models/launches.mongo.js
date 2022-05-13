const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  }, // from user
  mission: {
    type: String,
    required: true,
  }, // from user
  rocket: {
    type: String,
    // required: true,
  }, // from user
  target: {
    type: String,
    required: true,
  }, // from user
  customers: [String], // array of strings
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model("launch", launchesSchema);
