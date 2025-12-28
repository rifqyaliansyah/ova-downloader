const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagram.controller');
const validator = require('../middlewares/validator');

// Health check
router.get('/health', instagramController.healthCheck);

// Download Instagram content
router.post(
    '/download',
    validator.validateDownloadRequest,
    instagramController.download
);

module.exports = router;