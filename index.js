const express = require('express');
const router = require('./routes/router');
const mongoose = require('mongoose');
const Url = require('./model/url');
const shortId = require('shortid');
const path = require('path');
const statics = require('./routes/statics');
const userrouter = require('./routes/user');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.use('/', statics);
app.use('/user', userrouter);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;

        const entry = await Url.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() },
                },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.redirect(entry.redirectUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/url_shortner')
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
