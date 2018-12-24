import config from '../../../config';

const nodemailer = require('nodemailer');

const sendEmail = (user, data, callback) => {
  // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.email_cred.from, // generated ethereal user
        pass: config.email_cred.frompassword, // generated ethereal password
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: `"Obscura Admin  👻" <${config.email_cred.from}>`, // sender address
      to: config.email_cred.to, // list of receivers
      subject: data.subject, // Subject line
      text: `${data.email} ${data.description}`, // plain text body
      // html: '<b>Hello world?</b>', // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
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
