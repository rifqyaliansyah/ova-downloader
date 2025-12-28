require('dotenv').config();
const express = require('express');
const config = require('./src/config/app.config');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Video Downloader API',
    version: '1.0.0',
    endpoints: {
      instagram: 'POST /api/instagram/download'
    },
    documentation: 'https://github.com/yourusername/video-downloader-api'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    path: req.path
  });
});

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`Server running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Environment: ${config.env}`);
  console.log('='.repeat(50));
});