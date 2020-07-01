var loginDao = require('../model/LoginDao');

// login
module.exports.login = function (user_email, user_pass, callback) {
    loginDao.login(user_email, user_pass, function (err, result) {
       // do any validations here
       callback(err, result);
    });
 };

 // add a user
module.exports.addUser = function (user_name, user_email, user_pass, phone_number, role_id, height, weight, gender, level_activity, age, goal_weight, medical_conditions, callback) {
    loginDao.addUser(user_name, user_email, user_pass, phone_number, role_id, height, weight, gender, level_activity, age, goal_weight, medical_conditions, function (err, result) {
       if(Array.isArray(result)){
           console.log("isArray checked")
           console.log("the result add user :  "+ result[0]["user_id"])
        if (result[0]!=undefined) {
          callback(err, {sucess: 1,user_id:result[0]["user_id"],user_name:result[0]["user_name"],user_email:result[0]["user_email"]});
       }}
        else if(result=="exists") {
          callback(err, {sucess: 0, reason:"EMAIL_EXISTS"});
       }else{
        callback(err, {sucess: 0});

       }
    });
 };
//  // forget password
// module.exports.forgetPassword = function (user_email, callback) {
//    loginDao.forgetPassword(user_email, function (err, result) {
//       // do any validations here
//       callback(err, result);
//    });
// };

//  // reset password
//  module.exports.resetPassword = function (user_id, new_pass, callback) {
//    loginDao.resetPassword(user_id, new_pass, function (err, result) {
//       // do any validations here
//       callback(err, result);
//    });
// };