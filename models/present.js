const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const presentSchema = new Schema(
  {
    collegeId: {
      type: Schema.Types.ObjectId,
      ref: "College",
    },
    collegeName: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },

    stream: String,

    feesPaid: {
      type: Number,
      required: true,
    },

    attendance: {
      type: Number,
      required: true,
    },
    doa: {
      type: Schema.Types.Date,
      required: true,
    },

    academicResult: {
      type: Schema.Types.ObjectId,
      ref: "Result",
    },

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

    extraCurricular: [
      {
        type: Schema.Types.ObjectId,
        ref: "Extra",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Present", presentSchema);
