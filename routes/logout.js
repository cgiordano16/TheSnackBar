const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        req.session.userData ? console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Authenticated User)`) : console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Non-Authenicated User)`);
        req.session.destroy();
        res.clearCookie('userData');
        return res.status(200).json({"message": "Logged Out"});
        // res.render('logout/index.handlebars', { title: 'Logout Page' });
    } catch (e) {
        return res.status(404).json({"error": e})
        // res.status(404).render('logout/error.handlebars', { title: 'Logout Error', error: e})
    }
})

module.exports = router;