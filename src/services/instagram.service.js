const { igdl } = require('ab-downloader');

class InstagramService {
    /**
     * Download Instagram content
     * @param {string} url - Instagram URL
     * @returns {Promise<Object>} Download result
     */
    async downloadContent(url) {
        try {
            const result = await igdl(url);

            // Clean up response - hapus data yang ga penting
            const cleanData = this.cleanResponse(result);

            return {
                success: true,
                data: cleanData
            };
        } catch (error) {
            console.error('Instagram download error:', error.message);
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

        // Pastikan data adalah array
        const dataArray = Array.isArray(data) ? data : [data];

        // Filter dan clean setiap item
        return dataArray.map(item => {
            // Hanya ambil field yang penting
            return {
                url: item.url || null,
                thumbnail: item.thumbnail || null,
                title: item.title || null,
                // Tambahkan field lain yang kamu mau di sini
            };
        }).filter(item => item.url); // Hapus item yang ga punya URL
    }

    /**
     * Validate Instagram URL
     * @param {string} url - URL to validate
     * @returns {boolean} Is valid Instagram URL
     */
    isValidInstagramUrl(url) {
        const instagramPattern = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+\/?/;
        return instagramPattern.test(url);
    }
}

module.exports = new InstagramService();