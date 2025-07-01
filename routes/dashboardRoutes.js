const router = require('express').Router();
const controller = require('../controllers/dashboardController');

router.get("/stats", controller.getDashboardStats);

module.exports = router;
