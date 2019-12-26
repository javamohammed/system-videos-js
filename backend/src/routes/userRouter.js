const express = require('express')
const userController  = require('../controllers/userController')
const { checkEmpty,
        checkEmailIfExist,
        checkPasswordConfirmation,
        checkEmailForm,
        checkPasswordLength,
        Authentication
         } = require('../utils/userValidator')
const router = express.Router();

//Users::
router.post(
  "/signup",
  [
    checkEmpty("first_name"),
    checkEmpty("last_name"),
    checkEmpty("country"),
    checkEmpty("address"),
    checkEmailForm(),
    checkEmailIfExist(),
    checkPasswordLength(),
    checkPasswordConfirmation()
  ],
  userController.SignUp
);
router.post('/login',[Authentication()], userController.Login)
router.get("/confirm/email/:_id/:email", userController.confirmationEmail);

module.exports = router;


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