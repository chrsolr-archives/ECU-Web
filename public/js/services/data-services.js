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
                this.promos = [];
            }
            /**
             * Gets featured video. if the show is on air,
             * then it return the ustream url
             * @returns {IPromise<T>}
             */
            DataServices.prototype.getFeaturedVideo = function () {
                var _this = this;
                var q = _this.$q.defer();
                if ((new Date().getUTCDay() === 1 && new Date().getUTCHours() >= 23) ||
                    (new Date().getUTCDay() === 2 && new Date().getUTCHours() <= 2)) {
                    _this.featuredVideo = {
                        title: 'Live Stream',
                        url: 'http://www.ustream.tv/embed/10266764?v=3&amp;wmode=direct'
                    };
                    q.resolve(_this.featuredVideo);
                    return q.promise;
                }
                if (_this.featuredVideo) {
                    q.resolve(_this.featuredVideo);
                    return q.promise;
                }
                _this.$http.get('/api/featuredvideo')
                    .success(function (res) {
                    _this.featuredVideo = {
                        title: 'Video del Dia',
                        url: res
                    };
                    q.resolve(_this.featuredVideo);
                });
                return q.promise;
            };
            /**
             * Get Latest Promos
             * @returns {IPromise<T>}
             */
            DataServices.prototype.getPromos = function () {
                var _this = this;
                var q = _this.$q.defer();
                if (_this.promos.length === 0) {
                    _this.$http.get('/api/promos').success(function (res) {
                        for (var i = 0; i < res.length; i++) {
                            if (i % 2 === 0) {
                                var content = { content: [] };
                                content.content.push(res[i]);
                                content.content.push(res[i + 1]);
                                _this.promos.push(content);
                            }
                        }
                        q.resolve(_this.promos);
                    });
                    return q.promise;
                }
                q.resolve(_this.promos);
                return q.promise;
            };
            /**
             * Get Latest 50 News
             * @param {Number} max
             * @returns {IPromise<T>}
             */
            DataServices.prototype.getNews = function (max) {
                var _this = this;
                var q = _this.$q.defer();
                if (_this.news.length === 0) {
                    var limit = max || 50;
                    _this.$http.get('/api/news?limit=' + limit).success(function (res) {
                        _this.news = res;
                        q.resolve(_this.news);
                    });
                    return q.promise;
                }
                q.resolve(_this.news);
                return q.promise;
            };
            /**
             * Get News by Permalink
             * @param {Number} permalink
             * @returns {IPromise<T>}
             */
            DataServices.prototype.getNewsByPermalink = function (permalink) {
                var _this = this;
                var data = {};
                var q = _this.$q.defer();
                if (_this.news.length === 0) {
                    _this.$http.get('/api/news/' + permalink).success(function (res) {
                        q.resolve(res);
                    });
                    return q.promise;
                }
                for (var i in _this.news) {
                    if (_this.news[i].permalink === permalink) {
                        data = _this.news[i];
                        break;
                    }
                }
                q.resolve(data);
                return q.promise;
            };
            DataServices.$inject = ['$http', '$q'];
            return DataServices;
        })();
        angular.module('services')
            .service('DataServices', DataServices);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
