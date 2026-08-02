const upload = require('../middleware/upload');

exports.uploadImage = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message || 'Upload failed.' });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }
        res.json({ success: true, url: `/uploads/${req.file.filename}` });
    });
};