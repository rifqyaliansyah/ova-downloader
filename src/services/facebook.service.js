const { fbdown } = require('ab-downloader');

class FacebookService {
    /**
     * Download Facebook content
     * @param {string} url - Facebook URL
     * @returns {Promise<Object>} Download result
     */
    async downloadContent(url) {
        try {
            const result = await fbdown(url);

            // Cek jika ada error dari API
            if (result.status === false) {
                throw new Error(result.message || 'Failed to download Facebook content');
            }

            // Clean up response
            const cleanData = this.cleanResponse(result);

            return {
                success: true,
                data: cleanData
            };
        } catch (error) {
            console.error('Facebook download error:', error.message);
            throw error;
        }
    }

    /**
     * Clean response data - hapus info developer dan data yang ga perlu
     * @param {Object} data - Raw data from ab-downloader
     * @returns {Object} Cleaned data
     */
    cleanResponse(data) {
        if (!data) return null;

        // Cek jika ada error
        if (data.status === false) {
            return null;
        }

        // Ambil field yang penting aja dari fbdown()
        return {
            normal_video: data.Normal_video || null,  // Video kualitas normal
            hd: data.HD || null                        // Video kualitas HD
        };
    }

    /**
 * Validate Facebook URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid Facebook URL
 */
    isValidFacebookUrl(url) {
        const facebookVideoPatterns = [
            /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/watch\?v=/,
            /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/reel\//,
            /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/videos\//,
            /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/[^\/]+\/videos\//,
            /^https?:\/\/fb\.watch\//
        ];

        return facebookVideoPatterns.some(pattern => pattern.test(url));
    }
}

module.exports = new FacebookService();