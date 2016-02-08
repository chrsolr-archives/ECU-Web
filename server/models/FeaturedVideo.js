// modules
var mongoose = require('mongoose');

/**
 * Model Schema
 */
var FeaturedVideo = new mongoose.Schema({
    videoUrl: String
});

/**
 * Get Featured Video
 */
FeaturedVideo.statics.getFeaturedVideo = function(callback) {
    this.findOne({}, function (err, data) {
        return callback(err, data);
    });
};

module.exports = mongoose.model('FeaturedVideo', FeaturedVideo, 'FeaturedVideos');