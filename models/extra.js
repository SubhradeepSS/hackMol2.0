const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const extraSchema = new Schema({
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  competitionName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

module.exports = extraSchema;
