import React from 'react';
import nodemailer from 'nodemailer';

const TestNodeMailer = () => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.beget.com',
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'krl@skydescent.su', // generated ethereal user
        pass: 'zVe44N@ULG7NyCT', // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Kirill 👻" <krl@skydescent.su>', // sender address
      to: 'kirill310587@mail.ru, skilineed@gmail.com', // list of receivers
      subject: 'Привет ✔', // Subject line
      text: 'Привет мир?', // plain text body
      html: '<b>Привет мир?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);

  return <div>Тест NodeMailer</div>;
};

export default TestNodeMailer;
