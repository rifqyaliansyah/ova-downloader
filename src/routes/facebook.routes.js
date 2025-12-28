const express = require('express');
const router = express.Router();
const facebookController = require('../controllers/facebook.controller');
const validator = require('../middlewares/validator');

// Health check
router.get('/health', facebookController.healthCheck);

// Download Facebook content
router.post(
    '/download',
    validator.validateDownloadRequest,
    facebookController.download
);

module.exports = router;