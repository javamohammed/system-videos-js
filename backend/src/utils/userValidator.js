const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require('../models/User')
exports.checkEmpty = input => {
  return check(input)
    .not()
    .isEmpty()
    .trim()
    .escape();
};

exports.checkPasswordConfirmation = () => {
  return check("password").custom((value, { req }) => {
    if (value !== req.body.passwordConfirmation) {
      throw new Error("Password confirmation is incorrect");
    }
    return true;
  });
};

exports.checkEmailIfExist = () => {
  return check("email").custom(value => {
    return User.findOne({ email: value }).then(user => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
      return true;
    });
  });
};

exports.checkPasswordLength = () => {
    return check("password")
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long");
}

exports.checkEmailForm = () => {
    return check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("must be an valid E-mail ");
};

exports.Authentication = () => {
    return check("email").custom((value, { req }) => {
      return User.findOne({ email: value }).then(user => {
        if (!user) {
          return Promise.reject("E-mail doesn't exist!");
        }
          return   bcrypt.compare(req.body.password,user.password)
                  .then(doMath => {
                    if(doMath === false){
                      return Promise.reject("Invalid password !");
                    }
                  req.user = user;
                  return true;
                  })
            });
    });
}