///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var services;
    (function (services) {
        var GlobalServices = (function () {
            function GlobalServices($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            GlobalServices.prototype.getFeaturedVideo = function () {
                var q = this.$q.defer();
                if ((new Date().getUTCDay() === 1 && new Date().getUTCHours() >= 23) ||
                    (new Date().getUTCDay() === 2 && new Date().getUTCHours() <= 2)) {
                    q.resolve({
                        title: 'Live Stream',
                        url: 'http://www.ustream.tv/embed/10266764?v=3&amp;wmode=direct'
                    });
                }
                else {
                    var featuredVideo = Parse.Object.extend("FeaturedVideo");
                    var query = new Parse.Query(featuredVideo);
                    query.first({
                        success: function (object) {
                            q.resolve({
                                title: 'Video del Dia',
                                url: object.get('url')
                            });
                        },
                        error: function (error) {
                            q.reject("Error: " + error.code + " " + error.message);
                        }
                    });
                }
                return q.promise;
            };
            GlobalServices.prototype.subscribe = function (email) {
                var q = this.$q.defer();
                this.$http.post('/api/subscribe', { email: email })
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            GlobalServices.prototype.contactUs = function (contact) {
                var q = this.$q.defer();
                this.$http.post('/api/contactus', { contact: contact })
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            GlobalServices.prototype.getParseKeys = function () {
                var q = this.$q.defer();
                this.$http.get('/api/parse')
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            return GlobalServices;
        })();
        angular.module('services').factory('GlobalServices', ['$http', '$q', function ($http, $q) { return new GlobalServices($http, $q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=global-services.js.map