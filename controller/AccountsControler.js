var AccountsDao = require('../model/AccountDao')

//get the total balance for auser
module.exports.getAccountsTotal = function (user_id, callback) {
    AccountsDao.getAccountsTotal(user_id, function (err, result) {
        var ree = result[0]
        if (result[0].sum == null) {
            ree.sum = 0
        }
        callback(err, ree)
    })
}

//get accounts list
module.exports.getAccounts = function (user_id, callback) {
    AccountsDao.getAccounts(user_id, function (err, result) {
        callback(err, result)
    })
}