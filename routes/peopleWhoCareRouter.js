var express = require('express');
var router = express.Router();
var PeopleWhoCareController = require('../controller/PeopleWhoCareController')

router.get('/:id', function (req, res) {
    PeopleWhoCareController.getAllWhoCare(req.params.id, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})
router.post('/addWhoCare', function (req, res) {
    PeopleWhoCareController.addWhoCare(req.body.owner_id, req.body.name, req.body.relationship, req.body.status, req.body.amount, req.body.email, req.body.phone, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})
router.post('/updatePeople', function (req, res) {
    PeopleWhoCareController.updatePeople(req.body.id, req.body.status, req.body.amount, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})
router.get('/deletePeople/:id', function (req, res) {
    PeopleWhoCareController.deletePeople(req.params.id, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})
module.exports = router;