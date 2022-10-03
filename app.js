const express = require("express");
require("dotenv").config();

const nodemailer = require("nodemailer");
const emailData = require("./email.json");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/sendemail", async (req, res) => {
  try {
    for (var i = 0; i < emailData.length; i++) {
      const emai = emailData[i].email;
      console.log(emai);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.email,
          pass: process.env.pass,
        },
      });

      const mailOptions = {
        from: process.env.email,
        to: emai,
        subject: "CSI Trainees CINE'22",

        html:
          "<h4><b>Congratulations!</b></h4>" +
          "<h4>Welcome to Team CSI</h4>" +
          "<h4>We are pleased to inform you that out of 200+ active participants you are selected as a part of Team CSI Trainee.</h4>" +
          "<h4>To gear up your journey with us please join the below WhatsApp group. " +
          "<h4>We expect you to be present on 27th September at 4 PM, Basic IT Lab, (CSIT block, 3rd floor) for the very first introductory meeting with us.</h4>" +
          "<h4>With regards,</h4>" +
          "<h4>Team CSI</h4>",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("OTP sent: " + info.response);
        }
      });
      console.log("done");
    }
    res.status(200).send({
      message: "Done",
    });
  } catch (err) {
    res.status(400).send(`err ${err}`);
    console.log(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Port is connected to port to ${PORT} `);
});
