const multer = require('multer');

// Set up file storage options
const storage = multer.memoryStorage();

// Define multer upload with a file size limit and file filter
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 5 MB
    },
});

module.exports = upload;
