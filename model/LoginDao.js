var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    multipleStatements: true,
    host: "164.90.184.192",
    port: 3306,
    user: "sammy",
    password: "99815620",
    database: "KFAS"
});

// login
module.exports.login = function (user_email, user_pass, callback) {
    sql = "SELECT user_id, user_name, user_email FROM be_users WHERE user_email=? AND user_pass=?";
    pool.query(sql, [user_email, user_pass], function (err, result) {
        callback(err, result);
    });
};
// add a user
module.exports.addUser = function (user_name, user_email, user_pass, phone_number, role_id, height, weight, gender, level_activity, age, goal_weight, medical_conditions, callback) {
    checkEmailSql = "SELECT user_email FROM be_users WHERE user_email = ?;"
    pool.query(checkEmailSql, [user_email], function (err, result) {
        if (result[0] == undefined) {
            console.log("doesn't exist")
            sql = "INSERT INTO be_users (user_name, user_email, user_pass, phone_number, role_id) VALUES (?, ?, ?, ?, ?); INSERT INTO Profile (user_id, height, weight, gender, level_activity, age, goal_weight) VALUES ((SELECT user_id FROM be_users ORDER BY user_id DESC LIMIT 1), ?, ?, ?, ?, ?, ?); ";

            // if (allergies != null) {
            //     allergies.forEach(() => {
            //         sql += "INSERT INTO Allergies (user_id, allergie) VALUES ((SELECT user_id FROM be_users ORDER BY user_id DESC LIMIT 1), ?); ";
            //     });
            // }

            if (medical_conditions != "") {

                sql += "INSERT INTO user_condition (user_id, user_condition) VALUES ((SELECT user_id FROM be_users ORDER BY user_id DESC LIMIT 1), ?); ";

            }

            pool.query(sql, [user_name, user_email, user_pass, phone_number, role_id, height, weight, gender, level_activity, age, goal_weight].concat(medical_conditions), function (err, result) {
                console.log(err)
                console.log(result)

                // callback(err, result);
                sql1 = "SELECT user_id, user_name, user_email FROM be_users WHERE user_email=? AND user_pass=?";
                pool.query(sql1, [user_email, user_pass], function (err, result) {
                    console.log(result)
                    callback(err, result)
                })
            });

        } else {
            console.log("email already exists")
            callback(err, "exists")
        }


    })

};
// forget password
module.exports.forgetPassword = function (email, callback) {
    sql = "SELECT * FROM be_users WHERE user_email=?";
    pool.query(sql, [email], function (err, result) {
        callback(err, result);
    });
};

// reset password
module.exports.resetPassword = function (user_id, new_pass, callback) {
    sql = "UPDATE be_users SET user_pass=? WHERE user_id=?;";
    pool.query(sql, [new_pass, user_id], function (err, result) {
        callback(err, result);
    });
};