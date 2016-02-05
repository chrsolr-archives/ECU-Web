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
        var query = {limit: limit, isActive: true};

        NewsModel.getNews(query, function(err, data){

            if (err) 
                return res.status(200).send({success: false, error: err});

            var news = [];

            data.forEach(function (value) {
                news.push(value.toVM());
            });

            return res.status(200).send(news);
        });
    });

    /**
     * Get News by permalink
     */
    api.get('/news/:permalink', function (req, res) {
        var model = require('../models/News');
        var permalink = req.params.permalink;

        if (!permalink) throw "No permalink provided";

        model.findOne({permalink: permalink}).exec(function (err, data) {

            if (err) throw err;

            var news = data.toVM();

            return res.status(200).send(news);
        });
    });
};

module.exports = newsApis;