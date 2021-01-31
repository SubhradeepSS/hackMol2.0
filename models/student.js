const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const presentSchema = require("./present");

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    goingClass: {
      type: Number,
      default: 1
    },

    stream: String,

    address: {
      district: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pin: {
        type: String,
        required: true,
      },
    },

    number: {
      type: Number,
      required: true,
    },

    email: {
      type: Schema.Types.String,
      required: true,
    },

    aadhar: {
      type: Number,
      required: true,
    },

    dob: {
      type: Schema.Types.Date,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    FamilyIncome: {
      type: Number,
      required: true,
    },

    history: [presentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
