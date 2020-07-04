let cron = require('node-cron');
let nodemailer = require('nodemailer');
let EmailDao = require('../model/EmailDao');
// e-mail message options


// e-mail transport configuration
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
      auth: {
        user: 'kfashackathonv1@gmail.com',
        pass: '99815620'
      }
  });




module.exports.addAppointment = function (patient, doctor, patientEmail,AppointmentTime, callback) {
    
    EmailDao.addAppointment(patient,doctor,patientEmail,AppointmentTime,function(err,result){
callback(err,result)
    })
}
module.exports.getAll= function(callback){
    EmailDao.getEmail(function(err,res){
        callback(err,res)
    })
}

  module.exports.sendEmail=function(){
cron.schedule('* * * * *', () => {
    console.log("crone job  ran")
// Send e-mail
EmailDao.getEmail(function(err,res){
    res.forEach(element => {
        console.log(element)
        var date = Date.parse(element.AppointmentTime)
        // var date1 =  Date(date)
        console.log(date)
        console.log(Date.now())
        if(date-Date.now()<=7200000&&date-Date.now()>=0){
            let mailOptions = {
                from: 'kfashackathonv1@gmail.com',
                to: element.PatientEmail,
                subject: 'your appointment with Dr'+element.DoctorName,
                text: 'Some content to send'
           };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            })
        }
    });
 
})

});}