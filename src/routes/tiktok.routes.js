const express = require('express');
const router = express.Router();
const tiktokController = require('../controllers/tiktok.controller');
const validator = require('../middlewares/validator');

// Health check
router.get('/health', tiktokController.healthCheck);

// Download TikTok content
router.post(
    '/download',
    validator.validateDownloadRequest,
    tiktokController.download
);

module.exports = router;