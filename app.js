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
          user: "csichapters@gmail.com",
          pass: process.env.pass,
        },
      });

      const mailOptions = {
        from: "csichapters@gmail.com",
        to: emai,
        subject: "Registered for CINE'22",

        html:
          "<p>Team CSI congratulates you for being successfully registered for CINE'22. Brace yourself, fasten your seatbelts, polish your skills, and be ready for the most exciting recruitment drive.</p>" +
          "<h4>Mode: Offline</h4>" +
          "<h4>Date: 19 Sept 2022</h4>" +
          "<h4>Time: 4pm-6pm</h4>" +
          "<h4>Venue: Basic IT Lab( CSIT Block)</h4>" +
          "<h4>Stay Tuned to our Instagram page for further information.</h4>" +
          "<h4>https://www.instagram.com/csi_akgec/</h4>" +
          "<h4>Regards,</h4>" +
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
