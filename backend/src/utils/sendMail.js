const sender = require("gmail-send");

const CONFIG = {
  user: process.env.UserMail,
  pass: process.env.PassMail,
  from: "system-video<system-video@video.com>"
};

exports.sendMail = async (to, subject, html) => {
    const send = sender({
        ...CONFIG,
        to,
        subject,
        html
    })
   try {
      const result =  await send() // Using default parameters
      console.log("* [promise-example-1] then: res.result:", result.full);
      return {
          error: ""
        };
   } catch (error) {
      return {
        error: "Err_network_mail"
      };
   }
}