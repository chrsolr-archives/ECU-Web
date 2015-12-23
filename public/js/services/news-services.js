(function () {
    'use strict';

    angular.module('services').factory('NewsServices', ['$q', function ($q) {

        return {
            getNews: function(){
                var q = $q.defer();

                var news = Parse.Object.extend("News");
                var query = new Parse.Query(news);
                query.descending('createdAt');
                query.limit(8);
                query.find({
                    success: function(objects) {
                        var data = [];

                        angular.forEach(objects, function (value, key) {
                            data.push(value.toJSON());
                        });

                        q.resolve(data);
                    },
                    error: function(error) {
                        q.reject("Error: " + error.code + " " + error.message);
                    }
                });

                return q.promise;
            }
        }
    }]);
})();