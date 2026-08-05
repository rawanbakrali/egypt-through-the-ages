require('dotenv').config();
const { supabase, bucket } = require('./supabaseClient');

async function ensureBucket() {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;

    const exists = buckets.some((b) => b.name === bucket);
    if (exists) {
        console.log(`Bucket "${bucket}" already exists.`);
        return;
    }

    const { error: createError } = await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: '5MB',
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
    });
    if (createError) throw createError;

    console.log(`Bucket "${bucket}" created.`);
}

ensureBucket()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Failed to set up Supabase bucket:', err.message);
        process.exit(1);
    });
