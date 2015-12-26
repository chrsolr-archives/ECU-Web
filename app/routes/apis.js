var config = require('../../config/config');
var request = require('request');


module.exports = function (app, express) {

    var api = express.Router();

    app.use('/api', api);

    api.get('/youtube', function (req, res) {
        var max = req.query.max || 10;
        var page = req.query.page || '';
        var key = config.apis_keys.youtube;
        var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU3bdjHToDAsKUghgGq00c8Q&maxResults='+max+'&pageToken='+page+'&key=' + key;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(response.body);

                var data = {
                    next: json.nextPageToken,
                    prev: json.prevPageToken,
                    videos: []
                };

                for(item of json.items){
                    var imageUrl = "";

                    if (item.snippet.thumbnails.maxres != null)
                        imageUrl = item.snippet.thumbnails.maxres.url;
                    else if (item.snippet.thumbnails.standard != null)
                        imageUrl = item.snippet.thumbnails.standard.url;
                    else if (item.snippet.thumbnails.high != null)
                        imageUrl = item.snippet.thumbnails.high.url;
                    else if (item.snippet.thumbnails.medium != null)
                        imageUrl = item.snippet.thumbnails.medium.url;
                    else
                        imageUrl = item.snippet.thumbnails["default"].url;

                    var video = {
                        id: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        videoUrl: "https://www.youtube.com/embed/" + item.snippet.resourceId.videoId,
                        publishedAt: item.snippet.publishedAt,
                        description: item.snippet.description,
                        imageUrl: imageUrl
                        //publishedAt: new Date(item.snippet.publishedAt.Year, item.snippet.publishedAt.Month, item.snippet.publishedAt.Day),
                    };


                    data.videos.push(video);
                };

                res.send(data);
            }
        })
    });
};