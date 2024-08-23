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

const sendProductDeletedEmail = async (recipient, productTitle) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: NODEMAILER_EMAIL,
      to: recipient,
      subject: "Product Deleted Notification",
      text: `Your product "${productTitle}" has been deleted.`,
      html: `<p>Your product <strong>${productTitle}</strong> has been deleted.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
module.exports = {sendResetEmail,sendProductDeletedEmail};