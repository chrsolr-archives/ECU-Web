(function () {
    'use strict';

    angular.module('services').factory('GlobalServices', ['$http', '$q', function ($http, $q) {

        return {
            getFeaturedVideo: function(){
                var q = $q.defer();

                if ((new Date().getUTCDay() === 1 && new Date().getUTCHours() >= 23) ||
                    (new Date().getUTCDay() === 2 && new Date().getUTCHours() <= 2)) {
                    q.resolve({
                        title: 'Live Stream',
                        url: 'http://www.ustream.tv/embed/10266764?v=3&amp;wmode=direct'
                    });
                } else {
                    var featuredVideo = Parse.Object.extend("FeaturedVideo");
                    var query = new Parse.Query(featuredVideo);
                    query.first({
                        success: function(object) {
                            q.resolve({
                                title: 'Video del Dia',
                                url: object.get('url')
                            });
                        },
                        error: function(error) {
                            q.reject("Error: " + error.code + " " + error.message);
                        }
                    });
                }

                return q.promise;
            },
            subscribe: function(email) {
                var q = $q.defer();

                $http.post('/api/subscribe', {email: email})
                .success(function(data){
                    q.resolve(data);
                })
                .error(function(error){
                    q.reject(error);
                });

                return q.promise;
            },
            contactUs: function(contact){
                var q = $q.defer();

                $http.post('/api/contactus', {contact: contact})
                    .success(function(data){
                        q.resolve(data);
                    })
                    .error(function(error){
                        q.reject(error);
                    });

                return q.promise;
            }
        }
    }]);
})();