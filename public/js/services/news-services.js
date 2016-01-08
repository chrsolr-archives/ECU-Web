var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var NewsServices = (function () {
            function NewsServices($q) {
                this.$q = $q;
            }
            NewsServices.prototype.getNews = function (max) {
                var q = this.$q.defer();
                var queryLimit = max || 50;
                var news = Parse.Object.extend("News");
                var query = new Parse.Query(news);
                query.descending('createdAt');
                query.limit(queryLimit);
                query.find({
                    success: function (objects) {
                        var data = [];
                        angular.forEach(objects, function (value, key) {
                            data.push(value.toJSON());
                        });
                        q.resolve(data);
                    },
                    error: function (error) {
                        q.reject("Error: " + error.code + " " + error.message);
                    }
                });
                return q.promise;
            };
            NewsServices.prototype.getNewsByPermalink = function (permalink) {
                var q = this.$q.defer();
                var news = Parse.Object.extend("News");
                var query = new Parse.Query(news);
                query.equalTo('permalink', permalink);
                query.first({
                    success: function (object) {
                        q.resolve(object.toJSON());
                    },
                    error: function (error) {
                        q.reject("Error: " + error.code + " " + error.message);
                    }
                });
                return q.promise;
            };
            return NewsServices;
        })();
        angular.module('services').factory('NewsServices', ['$q', function ($q) { return new NewsServices($q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
