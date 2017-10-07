var donations = require('../models/donations');
var express = require('express');
var router = express.Router();

function getByValue(arr, id) {

    var result  = arr.filter(function(o){return o.id == id;} );

    return result ? result[0] : null; // or undefined
}

router.findAll = function(req, res) {
    // Return a JSON representation of our list
    res.json(donations);
}

router.findOne = function(req, res) {

    var donation = getByValue(donations,req.params.id);

    if(donation != null)
        res.json(donation);
    else
        res.json({ message: 'Donation NOT Found!'});
}

module.exports = router;