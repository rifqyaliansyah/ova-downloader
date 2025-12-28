const express = require('express');
const router = express.Router();
const instagramRoutes = require('./instagram.routes');

// Mount routes
router.use('/instagram', instagramRoutes);

// API info endpoint
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Video Downloader API',
        version: '1.0.0',
        availableServices: ['instagram'],
        endpoints: {
            instagram: {
                health: 'GET /api/instagram/health',
                download: 'POST /api/instagram/download'
            }
        }
    });
});

module.exports = router;