const youtubeService = require('../services/youtube.service');
const { successResponse, errorResponse } = require('../utils/response');

class YoutubeController {
    /**
     * Download YouTube content
     * @route POST /api/youtube/download
     */
    async download(req, res, next) {
        try {
            const { url } = req.body;

            // Validate URL exists
            if (!url) {
                return errorResponse(res, 'URL tidak boleh kosong', 400);
            }

            // Validate YouTube URL format
            if (!youtubeService.isValidYoutubeUrl(url)) {
                return errorResponse(
                    res,
                    'URL tidak valid. Pastikan URL dari YouTube',
                    400
                );
            }

            // Download content
            const result = await youtubeService.downloadContent(url);

            // Send success response
            return successResponse(
                res,
                result.data,
                'YouTube content berhasil didownload',
                200
            );

        } catch (error) {
            next(error);
        }
    }

    /**
     * Health check endpoint
     * @route GET /api/youtube/health
     */
    async healthCheck(req, res) {
        return successResponse(
            res,
            {
                status: 'OK',
                service: 'YouTube Downloader'
            },
            'Service is running',
            200
        );
    }
}

module.exports = new YoutubeController();