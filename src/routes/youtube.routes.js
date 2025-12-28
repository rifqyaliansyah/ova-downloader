const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtube.controller');
const validator = require('../middlewares/validator');

// Health check
router.get('/health', youtubeController.healthCheck);

// Download YouTube content
router.post(
    '/download',
    validator.validateDownloadRequest,
    youtubeController.download
);

module.exports = router;