const express = require('express');
const router = express.Router();
const { getBins, updateBin } = require('../controllers/binController');

router.get('/', getBins);
router.post('/update', updateBin);

module.exports = router;
