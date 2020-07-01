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

//get accounts total for a user
module.exports.getAccountsTotal = function (user_id, callback) {
    console.log("SQL" + user_id)
    const sql = "SELECT  SUM(baizaty.Accounts.balance) AS sum  FROM baizaty.Accounts Where owner_id=?"

    pool.query(sql, [user_id], function (err, result) {
        console.log(err)
        console.log(result)
        callback(err, result)

    })
}

//get accounts list with balance
module.exports.getAccounts = function (user_id, callback) {
    const sql = "SELECT * FROM baizaty.Accounts Where owner_id=?"
    pool.query(sql, [user_id], function (err, result) {
        callback(err, result)
    })
}