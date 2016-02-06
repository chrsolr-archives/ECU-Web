var mongoose = require('mongoose');

var FeaturedVideo = new mongoose.Schema({
    videoUrl: String
});

FeaturedVideo.statics.getFeaturedVideo = function(callback) {
    this.findOne({}, function (err, data) {
        return callback(err, data);
    });
};

module.exports = mongoose.model('FeaturedVideo', FeaturedVideo, 'FeaturedVideos');