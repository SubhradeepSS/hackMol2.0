const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const extraSchema = require("./extra");
const ResultSchema = require("./result");

const presentSchema = new Schema(
  {
    // collegeId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "College",
    // },

    // collegeName: {
    //   type: String,
    //   required: true,
    // },

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

    academicResult: ResultSchema,

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

    extraCurricular: [extraSchema],
  },
  { timestamps: true }
);

module.exports = presentSchema;
