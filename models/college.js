const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const collegeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
        district:{
            type: String,
            required: true
          },
        location:{
            type: String,
            required: true
          },
        state:{
            type: String,
            required: true
          },
        pin:{
            type: String,
            required: true
          }
    },
    email: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model('College', collegeSchema);
