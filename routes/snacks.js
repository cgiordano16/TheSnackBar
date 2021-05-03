const express = require('express');
const router = express.Router();
const snackData = require("../data/snacks");

router.get('/', async(req,res) => {
    try {
        const allSnacks = await snackData.getAll();
        return res.status(200).json(allSnacks);
    } catch(e) {
        return res.status(404).json({"error": "Could not find all snacks."});
    }
})

module.exports = router;