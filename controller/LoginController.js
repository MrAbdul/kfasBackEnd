var loginDao = require('../model/LoginDao');

// login
module.exports.login = function (user_email, user_pass, callback) {
    loginDao.login(user_email, user_pass, function (err, result) {
       // do any validations here
       callback(err, result);
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