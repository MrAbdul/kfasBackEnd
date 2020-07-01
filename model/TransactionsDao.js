var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    multipleStatements: true,
    host: "206.189.179.71",
    port: 3306,
    user: "Abdul",
    password: "99815620",
    database: "baizaty"
});

module.exports.getAllTransactions = function (user_id, callback) {
    console.log("SQL" + user_id)
    const sql = "SELECT * FROM baizaty.Transactions WHERE owner_id=?"

    pool.query(sql, [user_id], function (err, result) {
        console.log(err)
        console.log(result)
        callback(err, result)

    })
}
var updatedBalance
module.exports.add = function (id, amount, catagory, vendor, callback) {
    amount1 = amount
    const sql = "INSERT INTO `baizaty`.`Transactions` ( `owner_id`, `vendor`, `amount`, `catagorie`) VALUES ( ?, ?, ?, ?) "
    pool.query(sql, [id, vendor, amount, catagory], function (err, result) {
        console.log(err)
        console.log(result)
        const sql1 = "SELECT * FROM baizaty.Accounts WHERE owner_id=? AND type='checking'"
        var currentbalance
        pool.query(sql1, [id], function (err, result) {
            currentbalance = result[0].balance
            updatedBalance = currentbalance - amount1
            console.log("updated balance %", updatedBalance)
            const sql2 = "UPDATE baizaty.Accounts SET balance = ? WHERE (owner_id = ? AND type='checking')"
            pool.query(sql2, [updatedBalance, id], function (err, result) {
                callback(err, result)
            })


        })
    })
}

module.exports.getWhoCare = function (id, callback) {

    const sql3 = "select * from baizaty.People_who_care where owner_id=? and amount > ?"
    pool.query(sql3, [id, updatedBalance], function (err, result) {
        console.log("updated balance = ", updatedBalance)
        console.log(result)
        callback(err, result)
    })
}