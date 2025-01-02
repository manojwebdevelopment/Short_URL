const express = require('express');
const Url = require('../model/url');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allUrls = await Url.find();
    const id = req.query.id || null;  // Get 'id' from query parameter if it exists
    res.render('home', { urls: allUrls, id }); // Render home.ejs and pass 'id' and 'urls'
  } catch (err) {
    console.error('Error fetching URLs:', err);
    res.render('home', { urls: [], id: null });
  }
});




module.exports = router;