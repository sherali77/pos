const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.get('/', saleController.salesHistory);
router.post('/checkout', saleController.processSale);

module.exports = router;
