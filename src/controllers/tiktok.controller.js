const tiktokService = require('../services/tiktok.service');
const { successResponse, errorResponse } = require('../utils/response');

class TikTokController {
    /**
     * Download TikTok content
     * @route POST /api/tiktok/download
     */
    async download(req, res, next) {
        try {
            const { url } = req.body;

            // Validate URL exists
            if (!url) {
                return errorResponse(res, 'URL tidak boleh kosong', 400);
            }

            // Validate TikTok URL format
            if (!tiktokService.isValidTikTokUrl(url)) {
                return errorResponse(
                    res,
                    'URL tidak valid. Pastikan URL dari TikTok',
                    400
                );
            }

            // Download content
            const result = await tiktokService.downloadContent(url);

            // Send success response
            return successResponse(
                res,
                result.data,
                'TikTok content berhasil didownload',
                200
            );

        } catch (error) {
            next(error);
        }
    }

    /**
     * Health check endpoint
     * @route GET /api/tiktok/health
     */
    async healthCheck(req, res) {
        return successResponse(
            res,
            { status: 'OK', service: 'TikTok Downloader' },
            'Service is running',
            200
        );
    }
}

module.exports = new TikTokController();