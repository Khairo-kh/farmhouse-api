const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '371d0aa0d552d8',
      pass: 'bb0fb0a6e4fafb',
    },
  });

  const mailOptions = {
    from: 'Kai Kat <khairo.khatib@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
