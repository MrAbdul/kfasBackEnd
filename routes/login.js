var express = require('express');
var router = express.Router();
var loginController = require('../controller/LoginController');
var jwt = require('jsonwebtoken');
// var nodeMailer = require('nodemailer');

let privateKey = "MIICXQIBAAKBgQDT76/rfsnpa2oWMSD5Ps8l+XsbQbexZIEz+NNLGq3C+zP8jcrVqUgZgSEMBnNnDtunBviY5IjyiGJwQxTiUg5/BENG7jMWLCCciFUwJExTsJ1vxjeXFZhmpyI4NAmtCDoRLjldr8+4QOOJBoES3/vXfApl7VCFe+a+1rlk1b74KQIDAQABAoGBALcm3+SnwV4TEa7z7gb3nJS4sQaxGEoZDP8Y/aBeAeQKqraK4ssaa9B+o0x9FqXtVS1W/OdEOIVAD7HshtO/Df5rrtx7I3hlWDU7L5zsAqIeRBMqUf/dLaWTwlEY4a5rx5x1zR1QdJ2NesM+nPzYOOSA+agvM61omKyd78OyNouxAkEA8AJT+lSOym5hB1rm+dQl//5JdhUPAnqe6fSooluAGHjh5aGK7Fvmj8TvN+5vr4jxfkhOWWkTfEzFbcgkLZd2XwJBAOIOiktcQwi88US/hiu4EJzU80wm5amTCX2uIGDeb2lWAM+FD1NdC/3Z6QLFEOnfjuO/s0OS2C/+QrbLdQt6TncCQFSJvWKzXghXkL2yeyEMZMYin2WETWEmJ8tobe2iJSB5k7f6iqBuTmvdhhVBWv2NUuKUPWSo6kAiGnhswrF8ZCkCQQC3jDDUIdS4GpoYRR6PDwRGI05tTcP6nU3+g0z8+n8h21gLJ7Ia8RkUhEQDILmr+/6MhBHtUyVASsYmoCqoKCXfAkAirjxooUeL+uyPiTnub1medhFSfWDc3rtLVTAoPljEN6OUx6xfRqCDTMUsR58FRK/TLvcX80JtHYaicBMPU4yI";

// login
router.post('/', function (req, res) {
    loginController.login(req.body.user_email, req.body.user_pass, function (err, result) {
        if (err) throw err;
        if (result[0] != null) {
            let token = jwt.sign({ "user_id": result[0].user_id, "user_name": result[0].user_name, "user_email": result[0].user_email }, privateKey, { algorithm: 'HS256' });
            let response = {
                "success": 1,
                "accesstoken": token
            }
            res.send(response);
        } else {
            let response = {
                success: 0,
            }
            res.send(response);
        }
    });
});

// verify token
router.post('/verify', function (req, res) {
    jwt.verify(req.body.token, privateKey, { algorithm: "HS256" }, (err, user) => {
        if (err) throw err;
        res.send(user);
    });
});

router.post('/register', function (req, res) {
    loginController.addUser(req.body.user_name, req.body.user_email, req.body.user_pass, req.body.phone_number, req.body.role_id, req.body.height, req.body.weight, req.body.gender, req.body.level_activity, req.body.age, req.body.goal_weight, req.body.medical_conditions, function (err, result) {
      if (err) throw err;
      console.log("res"+result["sucess"])
      if (result["sucess"] ==1) {
        let token = jwt.sign({ "user_id": result["user_id"], "user_name": result["user_name"], "user_email": result["user_email"] }, privateKey, { algorithm: 'HS256' });
        let response = {
            "success": 1,
            "accesstoken": token
        }
        res.send(response);
    } else {
        let response = {
            success: 0,
        }
        res.send(result);
    }
      
    });
  });

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