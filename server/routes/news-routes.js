// modules
var NewsModel = require('../models/News');

/**
 * News api routes
 */
function newsApis(api) {
    
    /**
     * Get Latest News
     */
    api.get('/news', function (req, res) {
        
        var limit = req.query.limit || 50;
        var query = {isActive: true};

        NewsModel.getNews(query, limit, function(err, data){

            if (err) 
                return res.status(200).send({success: false, error: err});

            return res.status(200).send(data);
        });
    });

    /**
     * Get News by permalink
     */
    api.get('/news/:permalink', function (req, res) {
        var NewsModel = require('../models/News');
        var permalink = req.params.permalink;

        if (!permalink)
            return res.status(404).send({success: false, error: "No permalink provided"});

        NewsModel.getNewsByPermalink({permalink: permalink}, function (err, data) {

            if (err)
                return res.status(200).send({success: false, error: err});

            return res.status(200).send(data);
        });
    });
}

module.exports = newsApis;