(function () {
    'use strict';

    angular.module('controllers').controller('HomeController', ['$sce', 'GlobalServices', 'NewsServices', 'YoutubeServices', 'SoundcloudServices', 'tweets',
        function ($sce, GlobalServices, NewsServices, YoutubeServices, SoundcloudServices, tweets) {

            var vm = this;
            vm.isAudioPlaying = false;
            vm.track = new Audio();
            vm.selectedTrackIndex = 0;

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
                vm.selectedTrack = vm.songs[vm.selectedTrackIndex];
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
            };

            vm.playSong = function(index) {
                if (index < 0) index = 0;

                if (index >= vm.songs.length) index = vm.songs.length - 1;

                vm.selectedTrack = vm.songs[index];
                vm.selectedTrackIndex = index;

                if (vm.isAudioPlaying){
                    vm.track.pause();
                }

                vm.track = new Audio(vm.selectedTrack.stream_url);
                vm.track.play();
                vm.isAudioPlaying = true;
            };

            vm.stopSong = function() {
                if (vm.isAudioPlaying){
                    vm.track.pause();
                    vm.isAudioPlaying = false;
                }
            };

            vm.downloadSong = function(index){
                window.location.replace(vm.songs[index].download_url);
            };
        }]);
})();