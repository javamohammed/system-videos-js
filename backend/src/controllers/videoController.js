const { validationResult } = require("express-validator");
const {getIdVideo} = require('../utils/videoValidator')
const Video =  require('../models/Video')
const Comment = require("../models/Comment");
exports.addVideo = (req, res, next) => {
    //console.log(req.userId);
    res.setHeader("Content-Type", "application/json");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const video = new Video({
      id_video: getIdVideo(req.body.link),
      title: req.body.title,
      url: req.body.link,
      user: req.userId
    });
    video.save().then( _ => {
      return res.status(200).json({
        message: "video  addedd with success!",
        id_video: getIdVideo(req.body.link),
        title: req.body.title,
        url: req.body.link,
        user: req.userId,
        response: "ok",
        error: null
      });
    }).catch(err => {
      return res.status(422).json({
        errors: [
          ...errors.array(),
          {
            value: "Err_network",
            msg: "Please Try again",
            param: "Err_network",
            location: "body"
          }
        ]
      });
    })
};

exports.editVideo = (req, res, next) => {
    //console.log(req.userId);
    res.setHeader("Content-Type", "application/json");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    Video.findOne({ user: req.userId, id_video: req.body.id_video }).exec()
      .then(video => {
        video.title = req.body.title;
        return video.save();
      }).then( _ => {
      return res.status(200).json({
        message: "video  updated with success!",
        id_video: req.body.id_video,
        title: req.body.title,
        user: req.userId,
        response: "ok",
        error: null
      });
    }).catch(err => {
      return res.status(422).json({
        errors: [
          ...errors.array(),
          {
            value: "Err_network",
            msg: "Please Try again",
            param: "Err_network",
            location: "body"
          }
        ]
      });
    })
};
exports.deleteVideo = (req, res, next) => {
    //console.log(req.userId);
    res.setHeader("Content-Type", "application/json");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    Video.deleteOne({ user: req.userId, id_video: req.body.id_video })
      .then(_=> {
        return res.status(200).json({
          message: "video  deleted with success!",
          id_video: req.body.id_video,
          user: req.userId,
          response: "ok",
          error: null
        });
      }).catch(err => {
      return res.status(422).json({
        errors: [
          ...errors.array(),
          {
            value: "Err_network",
            msg: "Please Try again",
            param: "Err_network",
            location: "body"
          }
        ]
      });
    })
};

exports.getAllMyVideos = (req, res, next) => {
  Video.find({user: req.userId}).exec()
    .then(videos => {
      return res.status(200).json({
        videos: videos,
        response: "ok",
        error: null
      });

    }).catch(err => {
      return res.status(422).json({
        errors: [
          {
            value: "Err_network",
            msg: "Please Try again",
            param: "Err_network",
            location: "body"
          }
        ]
      });
    })
}

exports.getSuggestionVideos = (req, res, next) => {
  Video.find()
    .exec()
    .then(videos => {
      return res.status(200).json({
        videos: videos,
        response: "ok",
        error: null
      });
    })
    .catch(err => {
      return res.status(422).json({
        errors: [
          {
            value: "Err_network",
            msg: "Please Try again",
            param: "Err_network",
            location: "body"
          }
        ]
      });
    });
};

exports.getSearchedVideos = (req, res, next) => {
  //UserSchema.find({name: { $regex: '.*' + name + '.*' } }).limit(5);
  var search_value = req.query.v;
  Video.find({ title: { $regex: ".*" + search_value + ".*" } })
    .exec()
    .then(videos => {
      return res.status(200).json({
        videos: videos,
        response: "ok",
        error: null
      });
    })
    .catch(err => {
      return res.status(422).json({
        errors: [
          {
            value: "Err_network",
            msg: "Please Try again",
            param: "Err_network",
            location: "body"
          }
        ]
      });
    });
};

exports.getVideoWithComments =  async (req, res, next) => {
  try {
    const video = await Video.find({ _id: req.body.video }).exec()
    const comments = await Comment.find({ video: video }).populate({path: 'user',select:['_id','first_name','last_name','url_avatar','country']}).exec()
     return res.status(200).json({
       video: video,
       comments: comments,
       response: "ok",
       error: null
     });
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      errors: [
        {
          value: "Err_network",
          msg: "Please Try again",
          param: "Err_network",
          location: "body"
        }
      ]
    });
  }
      /*
      return res.status(200).json({
        videos: videos,
        response: "ok",
        error: null
      });*/
};
