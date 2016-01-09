///<reference path="../../../typings/tsd.d.ts" />
///<reference path="youtube-services.ts"/>
///<reference path="news-services.ts"/>
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var RouteResolverServices = (function () {
            function RouteResolverServices($q, YoutubeServices, NewsServices) {
                this.$q = $q;
                this.YoutubeServices = YoutubeServices;
                this.NewsServices = NewsServices;
            }
            RouteResolverServices.prototype.resolveVideosDetails = function (videoId) {
                return this.$q.all([
                    this.YoutubeServices.getYouTubeVideoById(videoId)
                ]).then(function (results) {
                    return {
                        video: results[0].data
                    };
                });
            };
            RouteResolverServices.prototype.resolveVideos = function (max) {
                return this.$q.all([
                    this.YoutubeServices.getYouTubeVideos(max)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            RouteResolverServices.prototype.resolveNews = function (max) {
                return this.$q.all([
                    this.NewsServices.getNews(max)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            RouteResolverServices.prototype.resolveNewsDetails = function (permalink) {
                return this.$q.all([
                    this.NewsServices.getNewsByPermalink(permalink)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            return RouteResolverServices;
        })();
        angular.module('services')
            .factory('RouteResolverServices', ['$q', 'YoutubeServices', 'NewsServices', function ($q, YoutubeServices, NewsServices) { return new RouteResolverServices($q, YoutubeServices, NewsServices); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
