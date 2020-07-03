let cron = require('node-cron');
let nodemailer = require('nodemailer');

// e-mail message options
let mailOptions = {
      from: 'kfashackathonv1@gmail.com',
      to: 'mrabdulrahman95@gmail.com',
      subject: 'Email from Node-App: A Test Message!',
      text: 'Some content to send'
 };

// e-mail transport configuration
let transporter = nodemailer.createTransport({
      service: 'smtp.gmail.com',
      port: 465,
      seure:  true,
      auth: {
        user: 'kfashackathonv1@gmail.com',
        pass: '99815620'
      }
  });

  module.exports.sendEmail=function(){
cron.schedule('* * * * *', () => {
// Send e-mail

transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  })
});}