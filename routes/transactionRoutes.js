const router = require('express').Router();
const controller = require('../controllers/transactionController');

router.get('/', controller.getAllTransactions);
router.post('/', controller.addTransaction);

module.exports = router;