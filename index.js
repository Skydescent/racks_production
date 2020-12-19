const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express(),
  bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/send", (req, res) => {
  const output = `
      <h3>Новый заказ:</h3>
      <ul>  
        <li>Телефон: ${req.body.phone}</li>
        <li>Электронный адрес: ${req.body.email}</li>
        <li>Высота стеллажа, см: ${req.body.height}</li>
        <li>Глубина полки, см: ${req.body.depth}</li>
        <li>Ширина полки, см: ${req.body.widht}</li>
        <li>Нагрузка на стеллаж, кг: ${req.body.load}</li>
        <li>Количество полок: ${req.body.shelvesQuantity}</li>
        <li>Количество стеллажей: ${req.body.racksQuantity}</li>
        <li>Комментарий к заказу: ${req.body.comment}</li>
        <li>Доставка: ${req.body.delivery + req.body.subDelivery}</li>
        <li>Сборка: ${req.body.installation}</li>
        <li>Сумма: ${req.body.total}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.beget.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "krl@skydescent.su", // generated ethereal user
      pass: "zVe44N@ULG7NyCT", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Новый заказ" <krl@skydescent.su>', // sender address
    to: "kirill310587@mail.ru", // list of receivers
    subject: "Новый заказ на стеллаж", // Subject line
    text: "", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.json({ result: "success" });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
