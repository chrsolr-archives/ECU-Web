// modules
var mongoose = require('mongoose');

/**
 * Model Schema
 */
var News = new mongoose.Schema({
    permalink: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    description: String,
    imageUrl: String,
    title: String,
    isActive: {type: Boolean, default: true},
    sourceTitle: String,
    sourceUrl: String
});

/**
 * Convert Model to ViewModel
 */
News.methods.toVM = function() {
    var _this = this;

    return {
        permalink: _this.permalink,
        createdAt: _this.createdAt,
        updatedAt: _this.updatedAt,
        description: _this.description,
        imageUrl: _this.imageUrl,
        title: _this.title,
        sourceTitle: _this.sourceTitle,
        sourceUrl: _this.sourceUrl
    };
};

/**
 * Get News. Default limit is 50
 */
News.statics.getNews = function(query, limit, callback) {
    var _this = this;
    _this.limit = limit || 50;

    _this.find(query).sort({'createdAt': -1}).limit(_this.limit).exec(function(err, data){

        var news = [];

        data.forEach(function (value) {
            news.push(value.toVM());
        });

        return callback(err, news);
    });
};

/**
 * Get News by permalink
 */
News.statics.getNewsByPermalink = function(query, callback) {
    var _this = this;

    _this.findOne(query).exec(function (err, data) {
        return callback(err, data.toVM());
    });
};

module.exports = mongoose.model('News', News, 'News');