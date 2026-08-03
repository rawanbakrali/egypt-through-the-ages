const eras = require('../data/eras');
const bookings = require('../data/bookings');
const Place = require('../models/Place');
const Event = require('../models/Event');
const Review = require('../models/Reviews');
const UserPlaceStatus = require('../models/UserPlaceStatus');
const User = require('../models/User');
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

exports.profile = async (req, res, next) => {
    try {
        if (!req.session.user) return res.redirect('/');
        if (req.session.user.role === 'admin') return res.redirect('/admin');

        const userId = req.session.user.id;

        const [currentUserDoc, statusEntries, reviewEntries] = await Promise.all([
            User.findById(userId),
            UserPlaceStatus.find({ userId }).populate('placeId').sort({ createdAt: -1 }),
            Review.find({ userId }).populate('placeId').sort({ createdAt: -1 })
        ]);

        const myRatingsByPlaceId = {};
        reviewEntries.forEach(r => {
            if (r.placeId) myRatingsByPlaceId[r.placeId._id.toString()] = r.rating;
        });

        const places = statusEntries
            .filter(entry => entry.placeId)
            .map(entry => ({
                status: entry.type, // "favorite" | "wishlist" | "visited"
                rating: myRatingsByPlaceId[entry.placeId._id.toString()] || 0,
                name: entry.placeId.name,
                location: entry.placeId.fullLocation || entry.placeId.location,
                date: entry.createdAt.toISOString(),
                image: entry.placeId.image
            }));

        const reviews = reviewEntries
            .filter(entry => entry.placeId)
            .map(entry => {
                const era = eras[entry.placeId.era] || {};
                const categoryInfo = (era.categories || []).find(c => c.key === entry.placeId.category) || {};
                return {
                    placeName: entry.placeName,
                    category: categoryInfo.label || entry.placeId.category,
                    rating: entry.rating,
                    text: entry.reviewText,
                    time: entry.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                };
            });

        res.render('profile', {
            title: 'My Profile | Egypt Through the Ages',
            profile: {
                name: req.session.user.username,
                handle: req.session.user.username.toLowerCase(),
                bio: currentUserDoc.bio,
                location: currentUserDoc.location,
                joined: currentUserDoc.createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                avatar: '' // no real avatar upload system yet — falls back to initial letter
            },
            places,
            reviews
        });
    } catch (err) {
        next(err);
    }
};