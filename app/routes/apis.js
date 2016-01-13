var config = require('../../config/config');
var request = require('request');
var Parse = require('parse/node').Parse;

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
                    next: json.nextPageToken || '',
                    prev: json.prevPageToken || '',
                    totalItems: json.pageInfo.totalResults,
                    videos: []
                };

                json.items.forEach(function(item, index, array){
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
                    };


                    data.videos.push(video);
                });

                res.send(data);
            }
        })
    });

    api.get('/youtube/:id', function (req, res) {
        var id = req.params.id;
        var key = config.apis_keys.youtube;
        var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=' + key;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(response.body);

                var data = {
                    id: id,
                    title: json.items[0].snippet.title,
                    videoUrl: "https://www.youtube.com/embed/" + id,
                    publishedAt: json.items[0].snippet.publishedAt,
                    description: json.items[0].snippet.description
                };

                res.json({success: true, message: '', data: data});
            }
        })
    });

    api.get('/soundcloud', function (req, res) {

        var url = 'http://api.soundcloud.com/users/146006073/tracks.json?client_id=' + config.apis_keys.soundcloud_client_id;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var songs = [];
                var json = JSON.parse(response.body);

                json.forEach(function(item, index, array) {
                    var cover = item.artwork_url;

                    cover = (cover) ? cover.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000138805507-sejp8z-t500x500.jpg";

                    var track = {
                        title: item.title,
                        trackId: item.id,
                        url: item.permalink_url,
                        imageUrl: cover,
                        dateCreated: item.created_at,
                        stream_url: item.stream_url + '?client_id=' + config.apis_keys.soundcloud_client_id,
                        download_url: item.download_url + '?client_id=' + config.apis_keys.soundcloud_client_id,
                        download_count: item.download_count || 0,
                        playback_count: item.download_count || 0
                    };

                    songs.push(track);
                });

                res.send({success: true, message: '', data: songs});
            }

        })
    });

    api.post('/subscribe', function(req, res){
        var email = req.body.email;

        if (!email) res.send({success: false, message: 'Email is empty.'});

        var Subscription = Parse.Object.extend("Subscription");
        var query = new Parse.Query(Subscription);
        query.equalTo("canonical", email.toUpperCase());
        query.first({
            success: function(object) {
                if (object) {
                    if (!object.get('isActive')) {
                        res.send({success: false, message: 'Email already found but is not active.'});
                    }

                    res.send({success: false, message: 'Email already found.'});
                } else {
                    var Subscription = Parse.Object.extend("Subscription");
                    var subscription = new Subscription();

                    subscription.set("email", email);
                    subscription.set("isActive", true);
                    subscription.set("canonical", email.toUpperCase());

                    subscription.save(null, {
                        success: function(subscription) {
                            res.send({success: true, message: 'Gracias por suscribirte!!!', data: subscription.toJSON()});
                        },
                        error: function(subscription, error) {
                            res.send({success: false, message: 'Failed to create new object, with error code: ' + error.message});
                        }
                    });
                }
            },
            error: function(error) {
                res.send({success: false, message: 'Error code: ' + error.message});
            }
        });
    });

    api.post('/contactus', function(req, res){

        var contact = req.body.contact;

        if (!contact) res.send({success: false, message: 'Contact information is empty.'});

        var sendgrid = require('sendgrid')('this.relos', 'this.r3l0s');

        sendgrid.send({
            to:       ['elcomiteurbanoradio@gmail.com', 'iamrelos@gmail.com'],
            from:     contact.email,
            subject:  contact.subject + ' - Via Contact Us',
            text:     'From: ' + contact.name + '\n' + 'Email: ' + contact.email + '\n\n' + contact.body
        }, function (err, json) {
            if (err) throw err;
            
            return res.status(200).send(json);
        });

    });

    api.get('/parse', function(req, res){

        var keys = {
            app_key: config.apis_keys.parse_app_key,
            client_key: config.apis_keys.parse_client_key
        };

        res.send(keys);
    });
};