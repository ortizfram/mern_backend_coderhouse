const nodemailer = require("nodemailer");
const path = require("path");
const twilio  = require("twilio");

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "ortizfranco48@gmail.com",
    pass: "hciz gswv llsz mekj",
  },
});

const sendMail = async (req, res) => {
  console.log("mailing");
  let result = await transport.sendMail({
    from: "Coder Tests ortizfranco48@gmail.com",
    to: "ortizfranco48@gmail.com",
    subject: "Correo de prueba",
    html: `<div><h1>Esto es un test!</h1><img src="cid:bob" /></div>`,
    attachments: [
      {
        filename: "bob-esponja.jpg",
        path: path.join("acc1", "src", "public", "imgs", "bob-esponja.jpg"),
        cid: "bob",
      },
    ], // files
  });
  console.log(result);
  res.status(201).json({ success: true, message: "mensaje enviado" });
};


const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_ACCOUNT_TOKEN = process.env.TWILIO_ACCOUNT_TOKEN;
const TWILIO_SMS_NUMBER = process.env.TWILIO_SMS_NUMBER;

console.log(TWILIO_ACCOUNT_SID,TWILIO_ACCOUNT_TOKEN)
const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_ACCOUNT_TOKEN);

const sendSMS = async (req, res) => {
  const { nombre, producto } = req.query;
  try {
    let result = await client.messages.create({
     from: TWILIO_SMS_NUMBER,
     to: "+5492613005849", // tiene que ser numero verificado por ahora
      body: `Gracias ${nombre} por su solicitud del producto ${producto} ha sido aprobada`,
    });
    res.status(201).json({ success: true, message: "sms sent" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMail,
  sendSMS,
};
