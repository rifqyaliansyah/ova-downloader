const facebookService = require('../services/facebook.service');
const { successResponse, errorResponse } = require('../utils/response');

class FacebookController {
    /**
     * Download Facebook content
     * @route POST /api/facebook/download
     */
    async download(req, res, next) {
        try {
            const { url } = req.body;

            // Validate URL exists
            if (!url) {
                return errorResponse(res, 'URL tidak boleh kosong', 400);
            }

            // Validate Facebook URL format
            if (!facebookService.isValidFacebookUrl(url)) {
                return errorResponse(
                    res,
                    'URL tidak valid. Pastikan URL dari Facebook',
                    400
                );
            }

            // Download content
            const result = await facebookService.downloadContent(url);

            // Send success response
            return successResponse(
                res,
                result.data,
                'Facebook content berhasil didownload',
                200
            );

        } catch (error) {
            next(error);
        }
    }

    /**
     * Health check endpoint
     * @route GET /api/facebook/health
     */
    async healthCheck(req, res) {
        return successResponse(
            res,
            {
                status: 'OK',
                service: 'Facebook Downloader'
            },
            'Service is running',
            200
        );
    }
}

module.exports = new FacebookController();