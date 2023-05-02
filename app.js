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
        subject: "CodeShell 3.0 Prize Distribution",

        html:
          // `<img src="cid:unique@kreata.ee"/>`+
          // "<h4>Dear Team Leader,</h4>" +
          "<h4>We are thrilled to inform you that prize distribution ceremony of CODESHELL 3.0 winners will be held on 2nd May 2023 , at 10:10A.M.  Basic IT Lab, 3rd floor CS/IT block.</h4>" +
          "<h4>Congratulations once again, and we look forward to celebrating your success with you!.</h4> " +
          // "<h4>Once again, congratulations on your success, and we look forward to seeing your team excel in the upcoming rounds of the Code-a-thon.</h4>" +
          "<h4>Best regards,</h4>" +
          "<h4>Team CSI</h4>",
        // attachments: [
        //   {
        //     filname: "Congrats.png",
        //     path: "./congrats.png",
        //     cid: "unique@kreata.ee",
        //   },
        // ],
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
