const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },   
    goingClass:Number,
    stream: String,
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
    number:{
        type:Number,
        required:true
    },
    email:{
        type: Schema.Types.String,
        required:true
    },
    aadhar:{
        type:Number,
        required:true
    },
    dob:{
        type: Schema.Types.Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    FamilyIncome:{
        type:Schema.Types.Decimal128,
        required:true
    },
    history: [{
        type:Schema.Types.ObjectId,
        ref:"Present"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
