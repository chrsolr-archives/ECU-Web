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
                _this.promos = [
                    {
                        content: [
                            {
                                title: 'Prohibido Buscarte',
                                artists: 'Darkiel',
                                banner: 'https://i1.sndcdn.com/artworks-000127925725-cotg4h-t500x500.jpg',
                                download: 'https://i1.sndcdn.com/artworks-000127925725-cotg4h-t500x500.jpg'
                            },
                            {
                                title: 'Pablo Escobar',
                                artists: 'Kartel Montana',
                                banner: 'https://41.media.tumblr.com/9167887e9d7f1c032d2e35ec2b6e13b5/tumblr_nxs0qckUyn1u7cg9jo1_500.jpg',
                                download: 'https://41.media.tumblr.com/9167887e9d7f1c032d2e35ec2b6e13b5/tumblr_nxs0qckUyn1u7cg9jo1_500.jpg'
                            }
                        ]
                    },
                    {
                        content: [
                            {
                                title: 'Real G',
                                artists: 'Ñengo Flow',
                                banner: 'http://hw-img.datpiff.com/m384e5c1/Nengo_Flow_Real_G-front-large.jpg',
                                download: 'http://hw-img.datpiff.com/m384e5c1/Nengo_Flow_Real_G-front-large.jpg'
                            },
                            {
                                title: 'El Eslabon Mas Grueso',
                                artists: 'Juanka El Problematik',
                                banner: 'https://i1.sndcdn.com/avatars-000106334666-3pmyuu-t500x500.jpg',
                                download: 'https://i1.sndcdn.com/avatars-000106334666-3pmyuu-t500x500.jpg'
                            }
                        ]
                    }
                ];
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