const express = require('express');
const {
    initializeDatabase,
    getTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
} = require('../controllers/transactionsController');
const router = express.Router();

// Define routes
router.get('/initialize', initializeDatabase);
router.get('/', getTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChartData);
router.get('/piechart', getPieChartData);
router.get('/combined', getCombinedData);

module.exports = router;
