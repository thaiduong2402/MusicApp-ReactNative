const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Nguoi = new Schema({
    ten: { type: String, default: 'hahaha' },
    tuoi: { type: Number, min: 18, index: true },
    sdt: { type: Number,  },
    ngaySinh: { type: Date, default: Date.now },
    img :{type: String}
  });


  module.exports = mongoose.model('Nguoi', Nguoi)   