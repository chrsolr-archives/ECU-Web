(function () {
    'use strict';

    angular.module('services').factory('YoutubeServices', ['$http', '$q', function ($http, $q) {

        return {
            getYouTubeVideos: function(max, page){
                var q = $q.defer();

                max = max || 10;
                page = page || '';

                $http.get('/api/youtube?max=' + max + '&page=' + page)
                    .success(function(data){
                        q.resolve(data);
                    })
                    .error(function(error){
                        q.reject(error);
                    });

                return q.promise;
            }, getYouTubeVideoById: function(id){
                var q = $q.defer();

                $http.get('/api/youtube/' + id)
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