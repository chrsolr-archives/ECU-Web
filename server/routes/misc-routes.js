var config = require('../config/config');
var request = require('request');

module.exports = function (api) {

    /**
     * Get Featured Video Url
     */
    api.get('/featuredvideo', function (req, res) {
        var model = require('../models/FeaturedVideo');

        model.findOne({}, function (err, data) {

            if (err) throw err;

            return res.status(200).send(data && data.videoUrl);
        });
    });

    /**
     * Get Promos
     */
    api.get('/promos', function (req, res) {
        var model = require('../models/Promo');

        model.find({isActive: true}).sort({'createdAt': -1}).limit(10).exec(function (err, data) {

            if (err) throw err;

            var promos = [];

            data.forEach(function (value) {
                var promo = {
                    artists: value.artists,
                    downloadUrl: value.downloadUrl,
                    imageUrl: value.imageUrl,
                    createdAt: value.createdAt,
                    title: value.title
                };

                promos.push(promo);
            });

            return res.status(200).send(promos);
        });
    });

    /**
     * Subscribe to updates
     */
    api.post('/subscribe', function (req, res) {
        var model = require('../models/Subscription');
        var email = req.body.email;

        if (!email) res.send({success: false, message: 'Email is empty.'});

        var subs = new model({
            email: email,
            canonical: email.toUpperCase()
        });

        subs.save(function (err) {

            if (err) {
                return res.status(200).send({
                    success: false,
                    message: 'Email already found.'
                })
            }

            return res.status(200).send({
                success: true,
                message: 'Gracias por suscribirte!!!'
            });

        });
    });

    /**
     * Send contact email
     */
    api.post('/contactus', function (req, res) {

        var contact = req.body.contact;

        if (!contact) res.send({success: false, message: 'Contact information is empty.'});

        var sendgrid = require('sendgrid')('this.relos', 'this.r3l0s');

        sendgrid.send({
            to: ['elcomiteurbanoradio@gmail.com', 'iamrelos@gmail.com'],
            from: contact.email,
            subject: contact.subject + ' - Via Contact Us',
            text: 'From: ' + contact.name + '\n' + 'Email: ' + contact.email + '\n\n' + contact.body
        }, function (err, json) {
            if (err) throw err;

            return res.status(200).send(json);
        });

    });

};