var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var SoundcloudServices = (function () {
            function SoundcloudServices($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            SoundcloudServices.prototype.getSoundcloudSongs = function () {
                var q = this.$q.defer();
                this.$http.get('/api/soundcloud')
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            return SoundcloudServices;
        })();
        angular.module('services')
            .factory('SoundcloudServices', ['$http', '$q', function ($http, $q) { return new SoundcloudServices($http, $q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
