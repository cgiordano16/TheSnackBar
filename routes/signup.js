const bcrypt = require("bcrypt");
const express = require("express");
const fs = require('fs');
const path = require("path");
const router = express.Router();

router.post("/", async (req, res) => {
    req.body.username = req.body.username.toLowerCase();
    if(!isNonEmptyString(req.body.username) || !isNonEmptyString(req.body.password || !isNonEmptyString(req.body.email) || !isNonEmptyString(req.body.confirmPassword))){
        return res.status(404).render('../views/login', {errorMessage :'You need to submit inputs as strings that are not empty.'});
    }
    if(req.body.password !== req.body.confirmPassword){
        return res.status(404).render('../views/login', {errorMessage :'Passwords do not match.'});
    }

    let userObject;

    try{
        new_user = await usersData.create(req.body.username, req.body.password, []);
        userObject = await usersData.getByName(req.body.username);
        req.session.user = userObject
        // return res.status(200).render('login/index.handlebars');
        return res.status(200).json(req.session.user);
    } catch {
        return res.status(200).json()
        // return res.status(401).render('login/error.handlebars', {errorMessage :'Unable to make account'})
    }  

    // const body = req.body;
    // let newUser = {}

    // if (!(body.username && body.password)) {
    //   return res.status(400).send({ error: "Data not formatted properly" });
    // }
    // newUser = body;



    // // generate salt to hash password
    // const salt = await bcrypt.genSalt(16);
    // // now we set user password to hashed password
    // newUser.hashedPassword = await bcrypt.hash(newUser.password, salt);
    // delete newUser.password

    // fs.readFile(path.resolve(__dirname, '../users.json'), 'utf-8', (err, jsonFile) => {
    //     if (err) {
    //         console.log("File read failed:", err);
    //         return res.status(404).render('login/error.handlebars', { title: 'Error', error: err });
    //     }
    //     try {
    //         const jsonUsers = JSON.parse(jsonFile);
    //         for (user in jsonUsers) {
    //             if (user.username === newUser.username) {
    //                 return res.status(404);
    //             }
    //         }
    //         newUser._id = jsonUsers.length;
    //         // console.log(jsonUsers);
    //         jsonUsers.push(newUser);
    //         newJson = JSON.stringify(jsonUsers);
    //         fs.writeFile(path.resolve(__dirname, '../users.json'), newJson, e => {
    //             if (e) {
    //                 console.log("File write failed:", e);
    //                 return res.status(404).render('login/error.handlebars', { title: 'Error', error: e });
    //             }
    //             return res.status(200).render('login/index.handlebars');
    //         });
    //     } catch (error) {
    //         console.log('Error parsing JSON string:', error);
    //         return res.status(404).render('login/error.handlebars', { title: 'Error', error: error });
    //     }
    // })
    
  });

module.exports = router;