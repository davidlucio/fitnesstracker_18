// Express stuff...
const router = require("express").Router();

// Exercise page
router.get("/exercise", function(req, res) {

    res.redirect(`/exercise.html?id=${req.query.id}`);

});

// Stats page
router.get("/stats", (req, res) => {
    res.redirect('/stats.html');
});

// API Routes
const apiRoutes = require('./api/index.js');
router.use('/api/', apiRoutes);

module.exports = router;