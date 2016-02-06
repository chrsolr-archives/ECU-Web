// modules
var mongoose = require('mongoose');

/**
 * Model Schema
 */
var Promo = new mongoose.Schema({
    artists: String,
    createdAt: {type: Date, default: Date.now},
    downloadUrl: String,
    imageUrl: String,
    title: String
});

/**
 * Convert Model to ViewModel
 */
Promo.methods.toVM = function() {
    var _this = this;

    return {
        artists: _this.permalink,
        createdAt: _this.createdAt,
        downloadUrl: _this.description,
        imageUrl: _this.imageUrl,
        title: _this.title
    };
};

Promo.statics.getPromos = function(query, limit, callback) {
    var _this = this;
    _this.limit = limit || 50;

    _this.find(query).sort({'createdAt': -1}).limit(_this.limit).exec(function(err, data){

        var promo = [];

        data.forEach(function (value) {
            promo.push(value.toVM());
        });

        return callback(err, promo);
    });

};

module.exports = mongoose.model('Promo', Promo, 'Promos');