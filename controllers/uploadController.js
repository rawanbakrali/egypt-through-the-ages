const path = require('path');
const upload = require('../middleware/upload');
const { supabase, bucket } = require('../utils/supabaseClient');

exports.uploadImage = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message || 'Upload failed.' });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        const ext = path.extname(req.file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                cacheControl: '3600'
            });

        if (error) {
            console.error('Supabase upload error:', error.message);
            return res.status(500).json({ success: false, message: 'Image upload failed.' });
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
        res.json({ success: true, url: data.publicUrl });
    });
};