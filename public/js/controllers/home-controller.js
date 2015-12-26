(function () {
    'use strict';

    angular.module('controllers').controller('HomeController', ['$sce', 'GlobalServices', 'NewsServices', 'YoutubeServices', 'tweets',
        function ($sce, GlobalServices, NewsServices, YoutubeServices, tweets) {

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

            YoutubeServices.getYouTubeVideos().then(function(data){
                vm.youtube = data;
                console.log(vm.youtube);
            });

            vm.sanitizeHTML = function (html) {
                return $sce.trustAsHtml(html);
            };

            vm.subscribe = function(){
                alert('Subscribe');
            }
        }]);
})();