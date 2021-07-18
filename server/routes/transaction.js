const {Router} = require('express')
const {userById, requireLogin, isAuthorized} = require('../middlewares/user')
const {check} = require('express-validator')
const { create, get, getFullRefund, getMyRefunds } = require('../controllers/transaction')

const router = Router()

router.get('/transactions/:userId', requireLogin, isAuthorized, get)

router.post('/transactions/:userId', requireLogin, isAuthorized, [
    check('transactionDetails', 'Transaction is required').notEmpty()
], create)

router.post('/transactions/:transactionId/full_refund/:userId', requireLogin, isAuthorized, [
    check('amount', 'Amount is required').notEmpty()
], getFullRefund)

router.get("/refunds/:userId", requireLogin, isAuthorized, getMyRefunds);

router.param('userId', userById)

module.exports = router;