const express = require('express');
const Url = require('../model/url');
const shortId = require('shortid');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const id = shortId.generate();
    await Url.create({ shortId: id, redirectUrl: url, visitHistory: [] });

    // Render the home page and pass the shortId as a variable
    const allUrls = await Url.find();
    return res.render('home', { id, urls: allUrls }); // Pass 'id' directly to the template
  } catch (err) {
    console.error('Error in POST /url:', err);
    return res.status(500).render('home', { id: null, urls: [], error: 'Internal Server Error' });
  }
});

router.get('/analytics/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  result = await Url.findOne({ shortId });
  return res.status(200).json({ totleclicks: result.visitHistory.length, analytics: result.visitHistory });
})

module.exports = router;
