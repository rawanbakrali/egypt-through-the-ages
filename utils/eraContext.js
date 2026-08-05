const eras = require('../data/eras');

// Built once at startup — data/eras.js is static data, no need to rebuild per request.
function buildEraContext() {
    const sections = Object.values(eras).map(era => {
        const categoryLines = (era.categories || []).map(cat => {
            const places = (era.categoryData && era.categoryData[cat.key]) || [];
            const placeLines = places
                .map(p => `    - ${p.name} (${p.fullLocation || p.location}): ${p.desc || ''}`)
                .join('\n');
            return `  ${cat.label}:\n${placeLines}`;
        }).join('\n');

        return [
            `## ${era.name} (${era.timelineRange})`,
            era.overviewText ? era.overviewText.paragraph : '',
            categoryLines
        ].filter(Boolean).join('\n');
    });

    return sections.join('\n\n');
}

const ERA_CONTEXT = buildEraContext();

module.exports = { ERA_CONTEXT };
