var express = require('express');
var router = express.Router();
var EmailController = require('../controller/EmailController');

// var nodeMailer = require('nodemailer');


// // login
// router.post('/', function (req, res) {
//     loginController.login(req.body.user_email, req.body.user_pass, function (err, result) {
//         if (err) throw err;
//         if (result[0] != null) {
//             let token = jwt.sign({ "user_id": result[0].user_id, "user_name": result[0].user_name, "user_email": result[0].user_email }, privateKey, { algorithm: 'HS256' });
//             let response = {
//                 "success": 1,
//                 "accesstoken": token
//             }
//             res.send(response);
//         } else {
//             let response = {
//                 success: 0,
//             }
//             res.send(response);
//         }
//     });
// });

// // verify token
// router.post('/verify', function (req, res) {
//     jwt.verify(req.body.token, privateKey, { algorithm: "HS256" }, (err, user) => {
//         if (err) throw err;
//         res.send(user);
//     });
// });

// router.post('/register', function (req, res) {
//     loginController.addUser(req.body.user_name, req.body.user_email, req.body.user_pass, req.body.phone_number, req.body.role_id, req.body.height, req.body.weight, req.body.gender, req.body.level_activity, req.body.age, req.body.goal_weight, req.body.medical_conditions, function (err, result) {
//       if (err) throw err;
//       console.log("res"+result["sucess"])
//       if (result["sucess"] ==1) {
//         let token = jwt.sign({ "user_id": result["user_id"], "user_name": result["user_name"], "user_email": result["user_email"] }, privateKey, { algorithm: 'HS256' });
//         let response = {
//             "success": 1,
//             "accesstoken": token
//         }
//         res.send(response);
//     } else {
//         let response = {
//             success: 0,
//         }
//         res.send(result);
//     }
      
//     });
//   });
router.get('/sendEmail',function(req,res){
    EmailController.sendEmail()
})


router.post('/addApointment', function (req, res) {
    // const unixTimeZero = Date.parse('01 01 1970 00:00:01 GMT');
    var date= Date.parse(req.body.month+" "+req.body.day+" "+req.body.year+" "+ req.body.hour+":"+req.body.minute+":"+req.body.sec)
    var date1 = new Date(date);
   
    var date2 =date1.toISOString()
    EmailController.addAppointment(req.body.patient, req.body.doctor,req.body.patientEmail,date2, function (err, result) {
        if (err) throw err;
        res.send(result)
        
    });
});

router.get('/all',function(req,res){
    EmailController.getAll(function(err,ress){
        res.send(ress)
    })
})

// forget password
// router.post('/forget', function (req, res) {
//     loginController.forgetPassword(req.body.user_email, function (err, result) {
//         if (err) throw err;
//         if (result.length > 0) {
//             let email = result[0].user_email;
//             let token = jwt.sign({ "user_id": result[0].user_id, "user_name": result[0].user_name }, privateKey, { algorithm: 'HS256' });

//             let transporter = nodeMailer.createTransport({
//                 host: 'smtp.gmail.com',
//                 port: 465,
//                 secure: true,
//                 auth: {
//                     user: 'pifss.hfs@gmail.com',
//                     pass: 'PIFSS123'
//                 }
//             });

//             let mailOptions = {
//                 to: email,
//                 subject: "Change your password",
//                 html: "<a href='http://localhost:3000/recovery/" + token + "'>Click here to change your password</a>"
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     return console.log(error);
//                 }
//                 console.log('Message %s sent: %s', info.messageId, info.response);
//             });
//         }
//         res.send({ success: 1 });
//     });
// });

// reset password
// router.put('/forget', function (req, res) {
//     jwt.verify(req.body.token, privateKey, { algorithm: "HS256" }, (err, user) => {
//         if (err) {
//             res.send({ success: 0 });
//         } else {
//             loginController.resetPassword(user.user_id, req.body.new_pass, function (err, result) {
//                 if (err) throw err;
//                 res.send({ success: 1 });
//             });
//         }
//     });
// });

module.exports = router;