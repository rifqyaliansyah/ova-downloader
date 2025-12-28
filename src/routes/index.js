const express = require('express');
const router = express.Router();
const instagramRoutes = require('./instagram.routes');
const tiktokRoutes = require('./tiktok.routes');
const youtubeRoutes = require('./youtube.routes');
const facebookRoutes = require('./facebook.routes');

// Mount routes
router.use('/instagram', instagramRoutes);
router.use('/tiktok', tiktokRoutes);
router.use('/youtube', youtubeRoutes);
router.use('/facebook', facebookRoutes);


// API info endpoint
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Video Downloader API',
        version: '1.0.0',
        availableServices: ['instagram', 'tiktok', 'youtube'],
        endpoints: {
            instagram: {
                health: 'GET /api/instagram/health',
                download: 'POST /api/instagram/download'
            },
            tiktok: {
                health: 'GET /api/tiktok/health',
                download: 'POST /api/tiktok/download'
            },
            youtube: {
                health: 'GET /api/youtube/health',
                download: 'POST /api/youtube/download'
            },
            facebook: {
                health: 'GET /api/facebook/health',
                download: 'POST /api/facebook/download'
            }
        }
    });
});

module.exports = router;