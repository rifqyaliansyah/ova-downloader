const instagramService = require('../services/instagram.service');
const { successResponse, errorResponse } = require('../utils/response');

class InstagramController {
    /**
     * Download Instagram content
     * @route POST /api/instagram/download
     */
    async download(req, res, next) {
        try {
            const { url } = req.body;

            // Validate URL exists
            if (!url) {
                return errorResponse(res, 'URL tidak boleh kosong', 400);
            }

            // Validate Instagram URL format
            if (!instagramService.isValidInstagramUrl(url)) {
                return errorResponse(
                    res,
                    'URL tidak valid. Pastikan URL dari Instagram (Post, Reel, atau IGTV)',
                    400
                );
            }

            // Download content
            const result = await instagramService.downloadContent(url);

            // Send success response
            return successResponse(
                res,
                result.data,
                'Instagram content berhasil didownload',
                200
            );

        } catch (error) {
            next(error);
        }
    }

    /**
     * Health check endpoint
     * @route GET /api/instagram/health
     */
    async healthCheck(req, res) {
        return successResponse(
            res,
            { status: 'OK', service: 'Instagram Downloader' },
            'Service is running',
            200
        );
    }
}

module.exports = new InstagramController();