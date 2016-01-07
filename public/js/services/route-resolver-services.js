///<reference path="../../../typings/tsd.d.ts" />
///<reference path="youtube-services.ts"/>
var app;
(function (app) {
    (function (services) {
        'use strict';

        var RouteResolverServices = (function () {
            function RouteResolverServices($q, YoutubeServices) {
                this.$q = $q;
                this.YoutubeServices = YoutubeServices;
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
            return RouteResolverServices;
        })();

        angular.module('services').factory('RouteResolverServices', ['$q', 'YoutubeServices', function ($q, YoutubeServices) {
                return new RouteResolverServices($q, YoutubeServices);
            }]);
    })(app.services || (app.services = {}));
    var services = app.services;
})(app || (app = {}));
