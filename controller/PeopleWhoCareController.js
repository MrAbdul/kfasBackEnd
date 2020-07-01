var peopleWhoCareDao = require("../model/peopleWhoCareDao");

module.exports.getAllWhoCare = function (user_id, callback) {
    peopleWhoCareDao.getAllWhoCare(user_id, function (err, result) {
        callback(err, result)
    })
}

//ad a person who cares
module.exports.addWhoCare = function (owner_id, name, relationship, status, amount, email, phone, callback) {
    peopleWhoCareDao.addWhoCare(owner_id, name, relationship, status, amount, email, phone, function (err, result) {
        callback(err, result)
    })

}
//update a person
module.exports.updatePeople = function (id, status, amount, callback) {
    peopleWhoCareDao.updatePeople(id, status, amount, function (err, result) {
        callback(err, result)
    })
}
module.exports.deletePeople = function (id, callback) {
    peopleWhoCareDao.deletePeople(id, function (err, result) {
        callback(err, result)
    })
}


