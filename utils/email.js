const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Farm <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //here
      return 1;
    }

    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '371d0aa0d552d8',
        pass: 'bb0fb0a6e4fafb',
      },
    });
  }

  async send(template, subject) {
    const htmlEmail = pug.renderFile(`${__dirname}/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText(htmlEmail),
      html: htmlEmail,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswdReset() {
    await this.send('passwordReset', 'Your password reset link');
  }

  async sendWelcome() {
    await this.send('welcome', 'welcome to the app');
  }
};
