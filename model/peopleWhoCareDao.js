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

//get all people who care for a spacfic user
module.exports.getAllWhoCare = function (user_id, callback) {
    console.log("SQL" + user_id)
    const sql = "SELECT * FROM baizaty.People_who_care WHERE owner_id=?"

    pool.query(sql, [user_id], function (err, result) {
        console.log(err)
        console.log(result)
        callback(err, result)

    })
}

//add a person who cares
module.exports.addWhoCare = function (owner_id, name, relationship, status, amount, email, phone, callback) {
    // console.log("SQL" + user_id)
    const sql = "INSERT INTO `baizaty`.`People_who_care` ( owner_id, name, relationship, status, amount, email, phone) VALUES ( ?, ?,?, ?, ?, ?, ?)"


    pool.query(sql, [owner_id, name, relationship, status, amount, email, phone], function (err, result) {
        console.log(err)
        console.log(result)
        callback(err, result)

    })
}
//update pwc
module.exports.updatePeople = function (id, status, amount, callback) {
    const sql = "UPDATE   baizaty.People_who_care SET status=?, amount=? where id=?;"
    pool.query(sql, [status, amount, id], function (err, result) {
        callback(err, result)
    })
}

module.exports.deletePeople = function (id, callback) {
    const sql = "DELETE FROM baizaty.People_who_care WHERE (id = ?)"
    pool.query(sql, [id], function (err, result) {
        callback(err, result)
    })
}