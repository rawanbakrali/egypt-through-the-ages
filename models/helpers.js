const eras = require('../data/eras');
const Place = require('./Place');

async function flattenPlaces() {
    const allPlaces = await Place.find({}).sort({ era: 1, category: 1 });
    return allPlaces.map(place => {
        const era = eras[place.era] || {};
        const categoryInfo = (era.categories || []).find(c => c.key === place.category) || {};
        return {
            compositeId: place._id.toString(),
            eraSlug: place.era,
            eraName: era.name || place.era,
            categoryKey: place.category,
            categoryLabel: categoryInfo.label || place.category,
            name: place.name,
            location: place.fullLocation || place.location,
            image: place.image,
            description: place.desc,
            status: place.status,
            updatedAt: place.updatedAt
                ? place.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : '—'
        };
    });
}

// Builds a map of { eraSlug: { name, categories: [{key, label}] } }
function buildEraCategoryMap() {
    const map = {};
    Object.keys(eras).forEach(eraSlug => {
        const era = eras[eraSlug];
        map[eraSlug] = {
            name: era.name,
            categories: (era.categories || []).map(c => ({ key: c.key, label: c.label }))
        };
    });
    return map;
}

module.exports = { flattenPlaces, buildEraCategoryMap };