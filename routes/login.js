const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const bcrypt = require('bcrypt');
// const users = require('../users');
// const jsonUsers = require('../users.json');

function isNonEmptyString (element) {
    if (typeof element == 'string') {
        return element.trim().length > 0;
    }
    return false;
}

router.post('/', async (req, res) => {
    if (!isNonEmptyString(req.body.username) || !isNonEmptyString(req.body.password)){
        return res.status(404).json({"errorMessage" :"You need to submit usernames and passwords as strings that are not empty."})
        // return res.status(404).render('../views/login', {errorMessage :'You need to submit usernames and passwords as strings that are not empty.'});
    }
    if (!req.body.tags) {
        req.body.tags = [];
    }
    
    const { username, password } = req.body;
    let userObject;

    try {
        userObject = await usersData.getByName(username);
    } catch (e) {
        return res.status(200).json({"errorMessage" :"User or Password are invalid."})
        // return res.status(401).render('login/error.handlebars', {errorMessage :'User or Password are invalid.'})
    }

    let match = await bcrypt.compare(password, userObject.password);

    if (match) {
        userObject.password
        req.session.userData = userObject
        return res.status(200).json(req.session.userData);
        // return res.redirect('/home');
	} else {
        return res.status(401).json({"errorMessage" :'User or Password are invalid.'})
        // return res.status(401).render('../views/login', {errorMessage :'User or Password are invalid.'});
	}   
    // try {
    // //     const { username, password } = req.body;
    // //     for (let obj in users) {
    // //         let match = await bcrypt.compare(password, users[obj].hashedPassword);
    // //         if (match === true && username === users[obj].username) {
    // //             req.session.userData = users[obj];
    // //             return res.redirect('/private');
    // //         }
    // //     }
    // // return res.status(401).render('login/error.handlebars', { title: 'Login Error', error: 'Incorrect Validation.  The username and/or password was incorrect.  Please try again.'})
    // } catch (e) {
    //     res.status(404).render('login/error.handlebars', { title: 'Error', error: e })
    // }
})

module.exports = router;