const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rating = new Schema({
    userName: { type: String, index: true },
    song:{type:String,index: true }
  });


  module.exports = mongoose.model('Rating', Rating)   