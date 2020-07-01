var express = require('express');
var router = express.Router();
var accountsController = require('../controller/AccountsControler')

router.get('/:id', function (req, res) {
    console.log(req.params.id)
    accountsController.getAccountsTotal(req.params.id, function (err, result) {
        if (err) throw err;
        res.send(result)
    })

}
)
router.get('/accounts/:id', function (req, res) {
    accountsController.getAccounts(req.params.id, function (err, result) {
        if (err) throw err;
        res.send(result)
    })
})
module.exports = router;
