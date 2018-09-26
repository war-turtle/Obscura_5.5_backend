import config from '../../../config';

const nodemailer = require('nodemailer');

const sendEmail = (user, data, callback) => {
  // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: `"Obscura Admin  👻" <${config.email_cred.from}>`, // sender address
      to: user.email, // list of receivers
      subject: `Hello ✔ ${user.name}`, // Subject line
      text: data.message, // plain text body
      // html: '<b>Hello world?</b>', // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return callback(error, null);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return callback(null, info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};

export default {
  sendEmail,
};
