///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController($sce, GlobalServices, NewsServices, YoutubeServices, SoundcloudServices, tweets) {
                this.$sce = $sce;
                this.GlobalServices = GlobalServices;
                this.NewsServices = NewsServices;
                this.YoutubeServices = YoutubeServices;
                this.SoundcloudServices = SoundcloudServices;
                this.tweets = tweets;
                var _this = this;
                _this.audio = document.createElement('audio');
                _this.GlobalServices.getFeaturedVideo().then(function (data) {
                    _this.featuredVideo = data;
                });
                _this.NewsServices.getNews(8).then(function (data) {
                    _this.news = data;
                });
                _this.tweets.get({
                    widgetId: '680180390867283968'
                }).then(function (data) {
                    _this.twitter = data.data.tweets;
                });
                _this.YoutubeServices.getYouTubeVideos(10).then(function (data) {
                    _this.youtube = data;
                });
                _this.SoundcloudServices.getSoundcloudSongs().then(function (data) {
                    _this.songs = data.data;
                });
            }
            HomeController.prototype.playTrack = function (index) {
                var _this = this;
                if (index < 0)
                    index = 0;
                if (index >= _this.songs.length)
                    index = _this.songs.length - 1;
                if (_this.selectedTrackIndex === index) {
                    _this.audio.pause();
                    _this.clearPlayTrackIcons();
                    return;
                }
                _this.selectedTrackIndex = index;
                _this.audio.setAttribute('src', _this.songs[index].stream_url);
                _this.audio.play();
                _this.togglePlayIcons(index);
            };
            HomeController.prototype.downloadTrack = function (url) {
                window.open(url);
            };
            ;
            HomeController.prototype.sanitizeHTML = function (html) {
                return this.$sce.trustAsHtml(html);
            };
            ;
            HomeController.prototype.subscribe = function () {
                var _this = this;
                _this.GlobalServices.subscribe(_this.subscribeEmail).then(function (data) {
                    if (!data.success)
                        console.error(data);
                    alert(data.message);
                    _this.subscribeEmail = '';
                });
            };
            ;
            HomeController.prototype.togglePlayIcons = function (index) {
                this.clearPlayTrackIcons();
                angular.element(document.querySelector('.sc-play-stop-' + index)).removeClass('pe-7s-play').addClass('pe-7s-close');
            };
            HomeController.prototype.clearPlayTrackIcons = function () {
                angular.element(document).find('[class*="sc-play-stop-"]').removeClass('pe-7s-close').addClass('pe-7s-play');
            };
            HomeController.$inject = ['$sce', 'GlobalServices', 'NewsServices', 'YoutubeServices', 'SoundcloudServices', 'tweets'];
            return HomeController;
        })();
        angular.module('controllers')
            .controller('HomeController', HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=home-controller.js.map