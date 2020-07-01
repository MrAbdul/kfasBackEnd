var express = require('express');
var router = express.Router();
var InvestController = require('..//controller/InvestController')

router.get('/:owner_id', function (req, res) {
    console.log(req.params.owner_id)
    InvestController.getAllInvestments(req.params.owner_id, function (err, result) {
        if (err) throw err;
        res.send(result)
    })

})
router.post('/add', function (req, res) {
    InvestController.add(req.body.owner_id, req.body.amount, req.body.company, req.body.rate, req.body.duration, function (err, result) {
        res.send(result)
    })
})



module.exports = router