require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const ADMIN_USERNAME = 'admin';
const ADMIN_EMAIL = 'admin@etta.com';
const ADMIN_PASSWORD = '1234'; 

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
        console.log('An admin with this email already exists — nothing to do.');
        await mongoose.disconnect();
        return;
    }

    const admin = new User({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD, 
        role: 'admin'
    });
    await admin.save();

    console.log('✅ Admin account created:');
    console.log('   Email:', ADMIN_EMAIL);
    console.log('   Password:', ADMIN_PASSWORD, '(change this after logging in for the first time)');

    await mongoose.disconnect();
}

run().catch(err => console.error('Seed failed:', err));