const { ttdl } = require('ab-downloader');

class TikTokService {
    /**
     * Download TikTok content
     * @param {string} url - TikTok URL
     * @returns {Promise<Object>} Download result
     */
    async downloadContent(url) {
        try {
            const result = await ttdl(url);

            // Clean up response - hapus data yang ga penting
            const cleanData = this.cleanResponse(result);

            return {
                success: true,
                data: cleanData
            };
        } catch (error) {
            console.error('TikTok download error:', error.message);
            throw error;
        }
    }

    /**
     * Clean response data - hapus info developer dan data yang ga perlu
     * @param {Array|Object} data - Raw data from ab-downloader
     * @returns {Array} Cleaned data
     */
    cleanResponse(data) {
        if (!data) return [];

        if (data.status === false) {
            return [];
        }

        return [{
            title: data.title || null,
            title_audio: data.title_audio || null,
            thumbnail: data.thumbnail || null,
            video: data.video || null,
            audio: data.audio || null
        }];
    }
    /**
     * Validate TikTok URL
     * @param {string} url - URL to validate
     * @returns {boolean} Is valid TikTok URL
     */
    isValidTikTokUrl(url) {
        const tiktokPattern = /^https?:\/\/(www\.)?(tiktok\.com|vt\.tiktok\.com)/;
        return tiktokPattern.test(url);
    }
}

module.exports = new TikTokService();