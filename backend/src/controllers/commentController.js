const { validationResult } = require("express-validator");
const Comment = require("../models/Comment");
exports.addComment = (req, res, next) => {
    //console.log(req.userId);
    res.setHeader("Content-Type", "application/json");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const comment = new Comment({
      video: req.body.video,
      comment: req.body.comment,
      user: req.userId
    });
  comment.save()
      .then(_ => {
        return res.status(200).json({
          message: "comment  addedd with success!",
          comment: req.body.comment,
          user: req.userId,
          response: "ok",
          error: null
        });
      })
      .catch(err => {
        console.log(err)
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
      });
};