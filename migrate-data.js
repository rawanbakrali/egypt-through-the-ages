// migrate-data.js
require('dotenv').config();
const mongoose = require('mongoose');
const eras = require('./data/eras');
const events = require('./data/events');
const Place = require('./models/Place');
const Event = require('./models/Event');

async function migratePlaces() {
    const placesToInsert = [];

    Object.keys(eras).forEach(eraSlug => {
        const era = eras[eraSlug];
        if (!era.categoryData) return;

        Object.keys(era.categoryData).forEach(categoryKey => {
            era.categoryData[categoryKey].forEach(place => {
                // Find matching coordinates from markersData, if this place has one
                const markerMatch = (era.markersData || []).find(m => m.name === place.name);

                placesToInsert.push({
                    name: place.name,
                    era: eraSlug,
                    category: categoryKey,
                    location: place.location,
                    fullLocation: place.fullLocation,
                    image: place.image,
                    thumbnails: place.thumbnails || [],
                    desc: place.desc,
                    history: place.history || '',
                    tags: place.tags || [],
                    interactive: place.interactive !== false,
                    status: place.status || 'published',
                    embed3D: place.embed3D || undefined,
                    coords: markerMatch ? markerMatch.coords : undefined,
                    quickFacts: place.quickFacts || {},
                    visitorInfo: place.visitorInfo || {}
                });
            });
        });
    });

    await Place.deleteMany({}); // clear existing, so re-running doesn't duplicate
    const inserted = await Place.insertMany(placesToInsert);
    console.log(`✅ Migrated ${inserted.length} places.`);
}

async function migrateEvents() {
    const eventsToInsert = events.map(event => ({
        slug: event.slug,
        title: event.title,
        type: event.type,
        category: event.category,
        date: event.date,
        time: event.time,
        location: event.location,
        coordinates: event.coordinates,
        description: event.description,
        image: event.image,
        booking: event.booking,
        ticketUrl: event.ticketUrl,
        featured: event.featured,
        status: event.status
    }));

    await Event.deleteMany({});
    const inserted = await Event.insertMany(eventsToInsert);
    console.log(`✅ Migrated ${inserted.length} events.`);
}

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    await migratePlaces();
    await migrateEvents();

    await mongoose.disconnect();
    console.log('Done.');
}

run().catch(err => console.error('Migration failed:', err));