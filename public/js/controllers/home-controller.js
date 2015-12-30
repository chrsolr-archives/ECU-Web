(function () {
    'use strict';

    angular.module('controllers').controller('HomeController', ['$sce', 'GlobalServices', 'NewsServices', 'YoutubeServices', 'SoundcloudServices', 'tweets',
        function ($sce, GlobalServices, NewsServices, YoutubeServices, SoundcloudServices, tweets) {

            var vm = this;

            GlobalServices.getFeaturedVideo().then(function (data) {
                vm.featuredVideo = data;
            });

            NewsServices.getNews(8).then(function(data){
                vm.news = data;
            });

            tweets.get({
                widgetId: '680180390867283968'
            }).then(function(data) {
                vm.tweets = data.data.tweets;
            });

            YoutubeServices.getYouTubeVideos().then(function(data){
                vm.youtube = data;
            });

            SoundcloudServices.getSoundcouldSongs().then(function(data){
                vm.songs = data.data;
            });

            vm.sanitizeHTML = function (html) {
                return $sce.trustAsHtml(html);
            };

            vm.subscribe = function(){
                GlobalServices.subscribe(vm.subscribeEmail).then(function(data){
                    if (!data.success) console.error(data);

                    alert(data.message);

                    vm.subscribeEmail = '';
                });
            }
        }]);
})();