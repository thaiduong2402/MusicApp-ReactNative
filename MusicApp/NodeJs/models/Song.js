const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Song = new Schema({
    ma: { type: String ,index: true},
    ten: { type: String, min: 8, index: true },
    caSi: { type: String },
    theLoai : {type:String},
    luotNghe : {type:Number}
  });


  module.exports = mongoose.model('Song', Song)   