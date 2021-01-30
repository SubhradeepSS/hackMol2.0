const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ResultSchema = new Schema(
  {
    cgpa: {
        type: Number,
        required: true
    },
    percentile: {
        type: Number,
        required: true
    },
    subjects: [
        {
            name: String,
            scores: {
                fa1: {
                    type: Number,
                    required: true,
                },
                fa2: {
                    type: Number,
                    required: true,
                },
                sa1: {
                    type: Number,
                    required: true,
                },
                fa3: {
                    type: Number,
                    required: true,
                },
                fa4: {
                    type: Number,
                    required: true,
                },
                sa2: {
                    type: Number,
                    required: true,
                },

            }
        }
    ]
  }
);

module.exports = mongoose.model('Result', ResultSchema);
