const express = require('express');
const path = require('path');
const eras = require('./data/eras');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Egypt Through the Ages | Explore Historical Egypt'
    });
});

app.get('/era/:slug', (req, res) => {
    const era = eras[req.params.slug];

    if (!era) {
        return res.status(404).send('Era not found');
    }

    res.render('era', {
        title: `${era.name} | Egypt Through the Ages`,
        era: era
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});