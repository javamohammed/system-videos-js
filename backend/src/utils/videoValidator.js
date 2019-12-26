const { check } = require("express-validator");
const Video = require('../models/Video')
exports.checkEmpty = input => {
  return check(input)
    .not()
    .isEmpty()
    .trim()
    .escape().withMessage('Invalid '+input);
};

exports.checkLinkFormat = () => {
  return check("link").custom((value, { req }) => {
    if (!checkLink(value)) {
      throw new Error("invalid link Youtube!!");
    }
    return true;
  });
};

const checkLink =(link) => {
    let LinkRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    if (!LinkRegex.test(link.toLowerCase())) {

      return false;
    }
    return true
}
exports.checkVideoIfExist = (input) => {
  return check(input).custom((value,{ req }) => {
      const id_video = input === "id_video"? value : this.getIdVideo(value)
    return Video.findOne({ id_video: id_video, user: req.userId }).then(
      video => {
        if (video && input === "link") {
          return Promise.reject("This video already exists !");
        }
        if (!video && input === "id_video") {
          return Promise.reject("This video doesn't exists !");
        }
        return true;
      }
    );
  });
};
exports.checkVideoIfExistForComment = () => {
  return check("video").custom((value, { req }) => {
    return Video.findOne({ _id: value }).then(video => {
      if (!video) {
        return Promise.reject("This video doesn't exists !");
      }
      return true;
    });
  });
};
exports.getIdVideo = (link) => {
    let id = ""

    if ((id = link.match(/(\?|&)v=([^&#]+)/))) {
      return id.pop();
    } else if ((id = link.match(/(\.be\/)+([^\/]+)/))) {
        return id.pop();
    } else if ((id = link.match(/(\embed\/)+([^\/]+)/))) {
        return id.pop().split('&')[0].replace("?rel=0", "");
           }
}