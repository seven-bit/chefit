const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChefSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password:{
  	type: String,
  	required: true
  },
  mobile:{
  	type: String,
  	required: true
  },
  address:{
    type: String,
    required: true
  },
  booked:{
  	type: Boolean,
  	default:false
  },
  requests:[{
  		userid: String,
  }],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chef = mongoose.model("chefs", ChefSchema);