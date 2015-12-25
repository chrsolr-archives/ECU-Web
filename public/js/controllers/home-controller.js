(function () {
    'use strict';

    angular.module('controllers').controller('HomeController', ['$sce', 'GlobalServices', 'NewsServices', 'tweets',
        function ($sce, GlobalServices, NewsServices, tweets) {

            var vm = this;

            GlobalServices.getFeaturedVideo().then(function (data) {
                vm.featuredVideo = data;
            });

            NewsServices.getNews().then(function(data){
                vm.news = data;
            });

            tweets.get({
                widgetId: '680180390867283968'
            }).then(function(data) {
                vm.tweets = data.data.tweets;
            });

            vm.sanitizeHTML = function (html) {
                console.log(html);
                return $sce.trustAsHtml(html);
            };
        }]);
})();