var peopleWhoCareDao = require("../model/TransactionsDao");

module.exports.getAllTransactions = function (user_id, callback) {
    peopleWhoCareDao.getAllTransactions(user_id, function (err, result) {
        callback(err, result)
    })
}
module.exports.getWhoCare= function(id,callback){
    peopleWhoCareDao.getWhoCare(id,function(err,result){
        callback(err,result)
    })
}
module.exports.add=function(id, amount, catagory, vendor, callback){
    peopleWhoCareDao.add(id, amount, catagory, vendor,function(err,result){
        callback(err,result)
    })
}
