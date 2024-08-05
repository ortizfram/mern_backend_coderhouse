const nodemailer  = require("nodemailer");
const NODEMAILER_EMAIL = "ortizfranco48@gmail.com";
const NODEMAILER_PASS = "zcsw andq fxqi rzud"// #google app password;

const sendResetEmail = async (recipient, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASS,
      },
    });

    // Add SameSite attribute to cookies
    transporter.on("token", (token) => {
      token.options.sameSite = "None";
    });

    const mailOptions = {
      from: NODEMAILER_EMAIL,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("\n\nEmail sent\n\n");
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendResetEmail;