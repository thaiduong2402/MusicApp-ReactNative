const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongRating = new Schema({
    user: { type: String, index: true },
    rating: { type: Number, index: true },
    song:{type:String,index: true }
  });


  module.exports = mongoose.model('SongRating', SongRating)   