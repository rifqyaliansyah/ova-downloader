const { youtube } = require('ab-downloader');

class YoutubeService {
    /**
     * Download YouTube content
     * @param {string} url - YouTube URL
     * @returns {Promise<Object>} Download result
     */
    async downloadContent(url) {
        try {
            const result = await youtube(url);

            // Cek jika ada error dari API
            if (result.status === false) {
                throw new Error(result.message || 'Failed to download YouTube content');
            }

            // Clean up response
            const cleanData = this.cleanResponse(result);

            return {
                success: true,
                data: cleanData
            };
        } catch (error) {
            console.error('YouTube download error:', error.message);
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

        // Ambil field yang penting aja dari youtube()
        return {
            title: data.title || null,
            thumbnail: data.thumbnail || null,
            author: data.author || null,
            mp3: data.mp3 || null,      // Audio only
            mp4: data.mp4 || null        // Video
        };
    }

    /**
     * Validate YouTube URL
     * @param {string} url - URL to validate
     * @returns {boolean} Is valid YouTube URL
     */
    isValidYoutubeUrl(url) {
        const youtubePattern = /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]+/;
        return youtubePattern.test(url);
    }
}

module.exports = new YoutubeService();