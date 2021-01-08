const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express(),
  bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/send", (req, res) => {
  const output =
    `
  <h3>Новый заказ:</h3>
  <ul>  
    <li>Телефон: ${req.body.phone}</li>
    <li>Электронный адрес: ${req.body.email}</li>
    <li>Категория товара: ${req.body.name}</li>` +
    req.body.product.reduce(
      (acc, cur) => acc + `<li>${cur.title}: ${cur.value} </li>`,
      ""
    ) +
    `<li>Комментарий к заказу: ${req.body.comment}</li>` +
    req.body.order.reduce(
      (acc, cur) => acc + `<li>${cur.title}: ${cur.value} </li>`,
      ""
    );

  let transporter = nodemailer.createTransport({
    host: "smtp.beget.ru",
    port: 465,
    secure: true,
    auth: {
      user: "skydescent@skydescent.su",
      pass: "Dp30A&TY",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"Новый заказ" <skydescent@skydescent.su>',
    to: "kirill310587@mail.ru, Stellage-tomsk@mail.ru",
    subject: "Новый заказ на стеллаж",
    text: "",
    html: output,
  };

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
