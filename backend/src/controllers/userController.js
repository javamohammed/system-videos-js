const { validationResult } = require('express-validator')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Send = require('../utils/sendMail')
const mail = require('../utils/mail')
const functions = require('../utils/functions')
const HOST = `${process.env.host}:3000`;

exports.SignUp = async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    //console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const user = User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        url_avatar: "",
        country: req.body.country,
        address: req.body.address,
        email: req.body.email,
        email_verified_at: null,
        password: hashedPassword
      });
      const resultUser = await user.save();
      const userId = resultUser._id;
      const emailCoded = functions.EncodeBase64(req.body.email);
      const result = await Send.sendMail(
        req.body.email,
        "Confirmation SyS Videos",
        mail.mailConfirmationHtml(
          req.body.email,
          `${HOST}/confirm/email/${userId}/${emailCoded}`
        )
      );
      if (result.error === "Err_network_mail") {
        return res.status(422).json({
          errors: [
            ...errors.array(),
            {
              value: "Err_network_mail",
              msg: "Please Try again",
              param: "Err_network_mail",
              location: "body"
            }
          ]
        });
      }
      return res.status(200).json({
        message: "user signup with success!",
        response: "ok",
        error: null
      });
    } catch (error) {
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
    }

    /*
    bcrypt.hash(req.body.password,12).then(hashedPassword => {
        const user = User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          url_avatar: "",
          country: req.body.country,
          address: req.body.address,
          email: req.body.email,
          email_verified_at: null,
          password: hashedPassword
        });
        return user.save()
    }).then(_=>{
        return res.status(200).json({
          message: "user signup with success!",
          error: null
        });
    }).catch(err => {
        errors.push({
          value: "Err_network",
          msg: "Please Try again",
          param: "Err_network",
          location: "body"
        });
         return res.status(422).json({ errors: errors.array() });
    })*/
}

exports.Login = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  //console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const token = jwt.sign(
    {
      email: req.user.email,
      userId: req.user._id.toString()
    },
    process.env.PrivateKeyJwt,
    {
      expiresIn: "1h"
    }
  );
  return res.status(200).json({
    message: "Authentication with success!",
    token: token,
    userId: req.user._id.toString(),
    expiresIn:  60 * 60 * 1000 // 20000 //20s
  });
};

exports.confirmationEmail = (req, res, next) => {
  const _id = req.params._id;
  const email = functions.DecodeBase64(req.params.email);
  User.findOne({_id:_id, email:email})
    .then(user => {
      if(!user){
        return res.status(422).json({
          hasError: true,
          errors: [
            {
              value: "Err_Link",
              msg: "Link confirmation Invalid",
              param: "Err_Link",
              location: "body"
            }
          ]
        });
      }
      user.email_verified_at =  Date.now()
      return user.save()
    })
    .then(_ => {
       return res.status(200).json({
         hasError: false,
         status: 200,
         message: "Email confirmed!",
         _id: _id,
         email: email
       });
    })
    .catch(error => {
      console.log(error)
      return res.status(422).json({
        hasError: true,
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
/**
    "errors": [
        {
            "value": "",
            "msg": "Invalid value",
            "param": "first_name",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Invalid value",
            "param": "last_name",
            "location": "body"
        }
    ]
*/