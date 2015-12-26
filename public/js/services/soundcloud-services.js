(function () {
    'use strict';

    angular.module('services').factory('SoundcloudServices', ['$http', '$q', function ($http, $q) {

        return {
            getSoundcouldSongs: function(){
                var q = $q.defer();

                $http.get('/api/soundcloud')
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