const express = require('express');
const router = express.Router();
const users = require('../users');

router.get('/', (req, res) => {
    try {
        const data = req.session.userData;
        delete data.hashedPassword;
        res.render('private/index.handlebars', { title: `${data.username} Information`, data: data });
    } catch (e) {
        res.status(404);
    }
})

module.exports = router;