///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../services/data-services.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController($sce, GlobalServices, YoutubeServices, SoundcloudServices, tweets, DataServices, facebook, $rootScope) {
                this.$sce = $sce;
                this.GlobalServices = GlobalServices;
                this.YoutubeServices = YoutubeServices;
                this.SoundcloudServices = SoundcloudServices;
                this.tweets = tweets;
                this.DataServices = DataServices;
                this.facebook = facebook;
                this.$rootScope = $rootScope;
                var _this = this;
                _this.audio = document.createElement('audio');
                _this.GlobalServices.getFeaturedVideo().then(function (data) {
                    _this.featuredVideo = data;
                });
                _this.DataServices.getNews(8).then(function (data) {
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
                _this.DataServices.getPromos().then(function (data) {
                    _this.promos = data;
                });
                $rootScope.$on("fb.init", function () {
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
            HomeController.prototype.sanitizeHTML = function (html) {
                return this.$sce.trustAsHtml(html);
            };
            HomeController.prototype.subscribe = function () {
                var _this = this;
                _this.GlobalServices.subscribe(_this.subscribeEmail).then(function (data) {
                    if (!data.success)
                        console.error(data);
                    alert(data.message);
                    _this.subscribeEmail = '';
                });
            };
            HomeController.prototype.subscribeWithFacebook = function () {
                var _this = this;
                _this.facebook.getUser(null, { fields: 'name, email' }).then(function (data) {
                    var user = data.user;
                    _this.GlobalServices.subscribe(user.email, user.name).then(function (data) {
                        if (!data.success)
                            console.error(data);
                        alert(data.message);
                        _this.subscribeEmail = '';
                    });
                }, function (err) {
                    console.log(err);
                });
            };
            HomeController.prototype.togglePlayIcons = function (index) {
                this.clearPlayTrackIcons();
                angular.element(document.querySelector('.sc-play-stop-' + index)).removeClass('pe-7s-play').addClass('pe-7s-close');
            };
            HomeController.prototype.clearPlayTrackIcons = function () {
                angular.element(document).find('[class*="sc-play-stop-"]').removeClass('pe-7s-close').addClass('pe-7s-play');
            };
            HomeController.$inject = ['$sce', 'GlobalServices', 'YoutubeServices', 'SoundcloudServices', 'tweets', 'DataServices', 'facebook', '$rootScope'];
            return HomeController;
        })();
        angular.module('controllers')
            .controller('HomeController', HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=home-controller.js.map