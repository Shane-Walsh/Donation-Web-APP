var donations = require('../models/donations');
var express = require('express');
var router = express.Router();

router.findAll = function(req, res) {
    // Return a JSON representation of our list
    res.json(donations);
}

module.exports = router;