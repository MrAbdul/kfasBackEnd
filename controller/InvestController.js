var InvestDao = require("../model/InvestDao");

module.exports.getAllInvestments = function (owner_id, callback) {
    InvestDao.getAllInvestments(owner_id, function (err, result) {
        callback(err, result)
    })
}
module.exports.add = function (id, amount, company, rate, duration, callback) {
    InvestDao.addInvestment(id, amount, company, rate, duration, function (err, result) {
        callback(err, result)
    })
}