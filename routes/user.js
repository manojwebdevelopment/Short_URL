const express = require('express');
const User = require('../model/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try{

        const {name , email, password} =req.body;
        const user = new User(req.body);
        await User.create({
            name,
            email,
            password,
        });
return res.render('home');

    }catch(error){
        console.error("Error registering user:", error);
        res.redirect('/');
    }
});

module.exports = router;