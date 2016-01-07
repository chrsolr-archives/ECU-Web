///<reference path="../../../typings/tsd.d.ts" />
///<reference path="youtube-services.ts"/>
var app;
(function (app) {
    var services;
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
            return RouteResolverServices;
        })();
        angular.module('services')
            .factory('RouteResolverServices', ['$q', 'YoutubeServices', function ($q, YoutubeServices) { return new RouteResolverServices($q, YoutubeServices); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=route-resolver-services.js.map