var mongoose = require('mongoose');

var FeaturedVideo = new mongoose.Schema({
    videoUrl: String
});

module.exports = mongoose.model('FeaturedVideo', FeaturedVideo, 'FeaturedVideos');