const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require("body-parser");

const userRouter =  require('./routes/userRouter')
const videoRouter = require("./routes/videoRouter");
const commentRouter = require("./routes/commentRouter");

const URI_DB = `mongodb://${process.env.UserDb}:${process.env.PassDb}@ds349618.mlab.com:49618/sys_db_vid`;
const app = express()
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
  //console.log(res.getHeader)
    next();
});
/*
app.use((req, res, next) => {
  req.user = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphdmFtb2hhbW1lZEBnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZGY3YWNiZmJjODk2MjJjOTQ2NzhhMjYiLCJpYXQiOjE1NzcwOTI4MTEsImV4cCI6MTU3NzA5NjQxMX0.C8zSD8rkp65tJIYTtab07F6EL1QRL5lPqmPeCb3Odwo",
    userId:"5df7acbfbc89622c94678a26"
  };
  next()
})*/
app.use(bodyParser.json());
//user Router
app.use(userRouter)
//video Router
app.use(videoRouter);
//video Router
app.use(commentRouter);
mongodb: app.get("/", (req, res, next) => {
  return res.send("hello everyone !!");
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  //const data = error.data;
  return res.status(status).json({
         errors: [
           {
             value: "Jwt_error",
             msg: message,
             param: "Jwt_error",
             location: "body"
           }
         ]
       });
});
mongoose
  .connect(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server && Database are Running...");
    });
  })
  .catch(error => console.log(error));