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

//get all investments for a user
module.exports.getAllInvestments = function (owner_id, callback) {
    // console.log("SQL" + user_id)
    const sql = "SELECT * FROM baizaty.invest WHERE owner_id=?"

    pool.query(sql, [owner_id], function (err, result) {
        console.log(err)
        console.log(result)
        callback(err, result)

    })
}

//add a new investment
module.exports.addInvestment = function (id, amount, company, rate, duration, callback) {
    const sql = "INSERT INTO `baizaty`.`invest` (owner_id, amount, company, rate, duration) VALUES ( ?, ?, ?, ?, ?) "
    pool.query(sql, [id, amount, company, rate, duration], function (err, result) {
        console.log(err)
        console.log(result)
        callback(err, result)
    })
}