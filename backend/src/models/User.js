const mongoose = require("mongoose")
const Schema = mongoose.Schema
/**
 {
    "first_name": "AouldBouchta",
    "last_name": "Mohammed",
    "url_avatar": "",
    "country": "Morocco",
    "address": "Beni makada",
    "email": "java@gmail.com",
    "email_verified_at": "",
    "password": "000000",
    "created_at": ""
 }
 */
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  url_avatar: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  email_verified_at: {
    type: Date,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema)