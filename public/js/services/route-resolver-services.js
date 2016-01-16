///<reference path="../../../typings/tsd.d.ts" />
///<reference path="youtube-services.ts"/>
///<reference path="data-services.ts"/>
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var RouteResolverServices = (function () {
            function RouteResolverServices($q, YoutubeServices, DataServices) {
                this.$q = $q;
                this.YoutubeServices = YoutubeServices;
                this.DataServices = DataServices;
            }
            RouteResolverServices.prototype.resolveVideosDetails = function (videoId) {
                return this.$q.all([
                    this.YoutubeServices.getYouTubeVideoById(videoId),
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
                    this.DataServices.getNews(max)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            RouteResolverServices.prototype.resolveNewsDetails = function (permalink) {
                return this.$q.all([
                    this.DataServices.getNewsByPermalink(permalink)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            return RouteResolverServices;
        })();
        angular.module('services')
            .factory('RouteResolverServices', ['$q', 'YoutubeServices', 'DataServices', function ($q, YoutubeServices, DataServices) { return new RouteResolverServices($q, YoutubeServices, DataServices); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=route-resolver-services.js.map