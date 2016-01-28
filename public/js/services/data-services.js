///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var DataServices = (function () {
            function DataServices($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.news = [];
            }
            DataServices.prototype.getPromos = function () {
                var q = this.$q.defer();
                var Promo = Parse.Object.extend("Promo");
                var query = new Parse.Query(Promo);
                query.descending('createdAt');
                query.equalTo('isActive', true);
                query.limit(10);
                query.find({
                    success: function (objects) {
                        var data = [];
                        for (var i = 0; i < objects.length; i++) {
                            if (i % 2 === 0) {
                                var content = { content: [] };
                                content.content.push(objects[i].toJSON());
                                content.content.push(objects[i + 1].toJSON());
                                data.push(content);
                            }
                        }
                        q.resolve(data);
                    },
                    error: function (error) {
                        q.reject("Error: " + error.code + " " + error.message);
                    }
                });
                return q.promise;
            };
            DataServices.prototype.getNews = function (max) {
                var _this = this;
                var q = _this.$q.defer();
                if (_this.news) {
                    q.resolve(_this.news);
                }
                else {
                    var queryLimit = max || 50;
                    var news = new Parse.Object("News");
                    var query = new Parse.Query(news);
                    query.descending('createdAt');
                    query.equalTo('isActive', true);
                    query.limit(queryLimit);
                    query.find().then(function (objects) {
                        var data = [];
                        angular.forEach(objects, function (value, key) {
                            data.push(value.toJSON());
                        });
                        _this.news = data;
                        q.resolve(_this.news);
                    }, function (error) {
                        q.reject("Error: " + error.code + " " + error.message);
                    });
                }
                return q.promise;
            };
            DataServices.prototype.getNewsByPermalink = function (permalink) {
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
            DataServices.$inject = ['$http', '$q'];
            return DataServices;
        })();
        angular.module('services')
            .service('DataServices', DataServices);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
