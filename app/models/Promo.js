var mongoose = require('mongoose');

var Promo = new mongoose.Schema({
    artists: String,
    createdAt: {type: Date, default: Date.now},
    downloadUrl: String,
    imageUrl: String,
    title: String
});

module.exports = mongoose.model('Promo', Promo, 'Promos');