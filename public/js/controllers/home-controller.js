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
            HomeController.prototype.sanitizeHTML = function (html) {
                return this.$sce.trustAsHtml(html);
            };
            ;
            HomeController.prototype.subscribe = function () {
                var _this = this;
                this.GlobalServices.subscribe(this.subscribeEmail).then(function (data) {
                    if (!data.success)
                        console.error(data);
                    alert(data.message);
                    _this.subscribeEmail = '';
                });
            };
            ;
            HomeController.$inject = ['$sce', 'GlobalServices', 'NewsServices', 'YoutubeServices', 'SoundcloudServices', 'tweets'];
            return HomeController;
        })();
        angular.module('controllers')
            .controller('HomeController', HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=home-controller.js.map