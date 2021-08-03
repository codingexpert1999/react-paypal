const {Router} = require('express')
const {userById, requireLogin, isAuthorized} = require('../middlewares/user')
const {check} = require('express-validator')
const { create, get, getFullRefund, getMyRefunds, getMySubscriptions, subscribe, unsubscribe } = require('../controllers/transaction')

const router = Router()

router.get('/transactions/:userId', requireLogin, isAuthorized, get)

router.post('/transactions/:userId', requireLogin, isAuthorized, [
    check('transactionDetails', 'Transaction is required').notEmpty()
], create)

router.post('/transactions/:transactionId/full_refund/:userId', requireLogin, isAuthorized, [
    check('amount', 'Amount is required').notEmpty()
], getFullRefund)

router.get("/refunds/:userId", requireLogin, isAuthorized, getMyRefunds);

router.get("/subscriptions/:userId", requireLogin, isAuthorized, getMySubscriptions)

router.post(`/subscribe/:userId`, requireLogin, isAuthorized, [
    check("subscriptionDetails", "Subscription details are required").notEmpty()
], subscribe)

router.post(`/subscriptions/:subscriptionId/:userId`, requireLogin, isAuthorized, [
    check("reason", "Reason is required").notEmpty()
], unsubscribe)

router.param('userId', userById)

module.exports = router;