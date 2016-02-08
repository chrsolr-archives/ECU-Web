// modules
var NewsModel = require('../models/News');
var utils = require('../modules/ecu-utils');

/**
 * News api routes
 */
function newsApis(api) {
    
    /**
     * Get Latest News
     */
    api.get('/news', function (req, res) {
        var limit = req.query.limit || 50;
        var query = { isActive: true };

        NewsModel.getNews(query, limit, function (err, data) {
            var response = utils.toResponse(false, '', data, err);

            if (err) {
                response.message = 'DB Error while trying to retrieve news.';
                return res.send(response);
            }

            return res.send(response);
        });
    });

    /**
     * Get News by permalink
     */
    api.get('/news/:permalink', function (req, res) {
        var response = utils.toResponse();
        var NewsModel = require('../models/News');
        var permalink = req.params.permalink;

        if (!permalink) {
            response.message = 'No permalink provided';
            return res.send(response);
        }

        NewsModel.getNewsByPermalink({ permalink: permalink }, function (err, data) {
            response = utils.toResponse(false, '', data, err);

            if (err) {
                response.message = 'DB Error while trying to retrieve news.'
                return res.send(response);
            }

            return res.send(response);
        });
    });
}

module.exports = newsApis;