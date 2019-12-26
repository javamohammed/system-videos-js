const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  id_video: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  /*
  description: {
    type: String,
    required: false
  },*/
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Video", videoSchema);

/**
 id_video:"",
 title:"zzzz",
 url:"https://www.youtube.com/watch?v=eqWNt2ssw_0",
 user:""
 */