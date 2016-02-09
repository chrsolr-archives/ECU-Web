// modules
var config = require('../config/config');
var request = require('request');
var utils = require('../modules/ecu-utils');

/**
 * Misc api routes
 */
function miscApis(api) {

    /**
     * Get Featured Video Url
     */
    api.get('/featuredvideo', function (req, res) {
        var FeatVideoModel = require('../models/FeaturedVideo');

        FeatVideoModel.getFeaturedVideo(function (err, data) {
            var response = utils.toResponse(false, '', data, err);
            
            if (err) {
                response.message = 'DB Error while trying to retrieve featured video.';
                return res.send(response);
            }
                
            return res.send(response);
        });
    });

    /**
     * Get Promos
     */
    api.get('/promos', function (req, res) {
        var PromoModel = require('../models/Promo');

        PromoModel.getPromos({ isActive: true }, 10, function (err, data) {
            var response = utils.toResponse(false, '', data, err);

            if (err) {
                response.message = 'DB Error while trying to retrieve featured promos.';
                return res.send(response);
            }

            return res.send(response);
        });
    });

    /**
     * Subscribe to updates
     */
    api.post('/subscribe', function (req, res) {
        var response = utils.toResponse();
        var SubscriptionModel = require('../models/Subscription');
        var email = req.body.email;

        if (!email) {
            response.message = 'Email is empty';
            return res.send(response);
        }

        var subs = new SubscriptionModel({
            email: email,
            canonical: email.toUpperCase()
        });

        subs.save(function (err) {
            response = utils.toResponse(true, 'Gracias por suscribirte!!!', undefined, err);

            if (err) {
                response.toResponse(false, 'Email already found.', undefined, err);
                return res.send(response);
            }

            return res.send(response);
        });
    });

    /**
     * Send contact email
     */
    api.post('/contactus', function (req, res) {
        var sendgrid = require('sendgrid')('this.relos', 'this.r3l0s');
        var contact = req.body.contact;

        if (!contact)
            return res.send({ success: false, message: 'Contact information is empty.' });

        sendgrid.send({
            to: ['elcomiteurbanoradio@gmail.com', 'iamrelos@gmail.com'],
            from: contact.email,
            subject: contact.subject + ' - Via Contact Us',
            text: 'From: ' + contact.name + '\n' + 'Email: ' + contact.email + '\n\n' + contact.body
        }, function (err, json) {
            if (err) {
                return res.status(200).send({
                    success: false,
                    message: 'Something went wrong while sending email.',
                    error: err
                });
            }

            return res.status(200).send(json);
        });

    });

}

module.exports = miscApis;