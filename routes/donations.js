var donations = require('../models/donations');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Donation = require('../models/donations');

mongoose.connect('mongodb://localhost:27017/donationsdb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

function getByValue(arr, id) {

    var result  = arr.filter(function(o){return o.id == id;} );

    return result ? result[0] : null; // or undefined
}

router.findAll = function(req, res) {
    // Use the Donation model to find all donations
    Donation.find(function(err, donations) {
        if (err)
            res.send(err);

        res.json(donations);
    });
}

router.findOne = function(req, res) {

    // Use the Donation model to find a single donation
    Donation.find({ "_id" : req.params.id },function(err, donation) {
        if (err)
            res.json({ message: 'Donation NOT Found!', errmsg : err } );
        else
            res.json(donation);
    });
}

router.addDonation = function(req, res) {

    var donation = new Donation();

    donation.paymenttype = req.body.paymenttype;
    donation.amount = req.body.amount;

    console.log('Adding donation: ' + JSON.stringify(donation));

    // Save the donation and check for errors
    donation.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Donation Added!', data: donation });
    });
}

router.incrementUpvotes = function(req, res) {

    Donation.findById(req.params.id, function(err,donation) {
        if (err)
            res.send(err);
        else {
            donation.upvotes += 1;
            donation.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Donation Upvoted!', data: donation });
            });
        }
    });
}

router.deleteDonation = function(req, res) {

    Donation.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Donation Deleted!'});
    });
}

module.exports = router;