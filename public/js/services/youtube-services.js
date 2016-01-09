///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var YoutubeServices = (function () {
            function YoutubeServices($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            YoutubeServices.prototype.getYouTubeVideos = function (max, page) {
                var q = this.$q.defer();
                max = max || 10;
                page = page || '';
                this.$http.get('/api/youtube?max=' + max + '&page=' + page)
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            YoutubeServices.prototype.getYouTubeVideoById = function (id) {
                var q = this.$q.defer();
                this.$http.get('/api/youtube/' + id)
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            return YoutubeServices;
        })();
        angular.module('services')
            .factory('YoutubeServices', ['$http', '$q', function ($http, $q) { return new YoutubeServices($http, $q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=youtube-services.js.map