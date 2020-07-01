var express = require('express');
var router = express.Router();
var transactionController = require('../controller/TransactionsControler')

router.get('/:id', function (req, res) {
    transactionController.getAllTransactions(req.params.id, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})
router.get('/getWhoCare/:id', function (req, res) {
    transactionController.getWhoCare(req.params.id, function (err, result) {
        res.send(result)
    })
})
router.post('/add', function (req, res) {
    transactionController.add(req.body.id, req.body.amount, req.body.catagory, req.body.vendor, function (err, result) {
        res.send(result)
    }

    )
})

module.exports = router