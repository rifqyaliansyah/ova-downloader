const { errorResponse } = require('../utils/response');

class Validator {
    /**
     * Validate download request
     */
    validateDownloadRequest(req, res, next) {
        const { url } = req.body;

        if (!url) {
            return errorResponse(res, 'URL diperlukan', 400);
        }

        if (typeof url !== 'string') {
            return errorResponse(res, 'URL harus berupa string', 400);
        }

        if (url.trim().length === 0) {
            return errorResponse(res, 'URL tidak boleh kosong', 400);
        }

        // Basic URL validation
        try {
            new URL(url);
        } catch (error) {
            return errorResponse(res, 'Format URL tidak valid', 400);
        }

        next();
    }
}

module.exports = new Validator();