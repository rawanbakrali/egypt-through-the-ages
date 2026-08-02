const eras = require('../data/eras');
const bookings = require('../data/bookings');
const Place = require('../models/Place');
const Event = require('../models/Event');
const { flattenPlaces, buildEraCategoryMap } = require('../models/helpers');

exports.home = (req, res) => {
    res.render('home', {
        title: 'Egypt Through the Ages | Explore Historical Egypt'
    });
};

exports.eraPage = async (req, res, next) => {
    try {
        const eraSlug = req.params.slug;
        const era = eras[eraSlug];

        if (!era) {
            return res.status(404).render('404', {
                title: 'Page Not Found | Egypt Through the Ages',
                path: req.originalUrl
            });
        }
        const publishedPlaces = await Place.find({ era: eraSlug, status: 'published' });
        const categoryData = {};
        (era.categories || []).forEach(cat => {
            categoryData[cat.key] = publishedPlaces
                .filter(p => p.category === cat.key)
                .map(p => ({
                    placeId: p._id.toString(),
                    name: p.name,
                    location: p.location,
                    fullLocation: p.fullLocation,
                    image: p.image,
                    thumbnails: p.thumbnails,
                    desc: p.desc,
                    history: p.history,
                    tags: p.tags,
                    interactive: p.interactive,
                    embed3D: p.embed3D,
                    quickFacts: p.quickFacts,
                    visitorInfo: p.visitorInfo
                }));
        });

        // Rebuild markersData from places that actually have coordinates
        const markersData = publishedPlaces
            .filter(p => p.coords && p.coords.length === 2)
            .map(p => ({
                name: p.name,
                coords: p.coords,
                category: (era.categories.find(c => c.key === p.category) || {}).label || p.category,
                location: p.fullLocation,
                desc: p.desc,
                image: p.image
            }));

        const publicEra = {
            ...era,
            categoryData,
            markersData
        };

        res.render('era', {
            title: `${era.name} | Egypt Through the Ages`,
            era: publicEra
        });
    } catch (err) {
        next(err);
    }
};

exports.adminDashboard = async (req, res, next) => {
    try {
        const flatPlaces = await flattenPlaces();
        const allEvents = await Event.find({}).sort({ createdAt: -1 });

        res.render('admin', {
            title: 'Admin Management UI — Egypt Through the Ages',
            places: flatPlaces,
            eraCategoryMap: buildEraCategoryMap(),
            events: allEvents,
            bookings: bookings
        });
    } catch (err) {
        next(err);
    }
};

exports.profile = (req, res) => {
    if (!req.session.user) return res.redirect('/');
    if (req.session.user.role === 'admin') return res.redirect('/admin');

    res.render('profile', {
        title: 'My Profile | Egypt Through the Ages',
        profile: {
            name: req.session.user.username,
            handle: req.session.user.username.toLowerCase(),
            bio: 'Exploring Egypt through the ages, one place at a time.',
            location: 'Egypt',
            joined: 'This session', // no real account-creation date tracked yet
            avatar: '' // no real avatar upload system yet — falls back to initial letter
        },
        places: [], // no real per-user visited/favorite/wishlist data yet
        reviews: [] // reviews are currently stored per-place, not per-user
    });
};