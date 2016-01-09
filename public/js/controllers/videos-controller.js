///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../services/youtube-services.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        'use strict';
        var VideosController = (function () {
            function VideosController(initData, YoutubeServices, $window) {
                this.YoutubeServices = YoutubeServices;
                this.$window = $window;
                var _this = this;
                _this.videos = initData.data.videos;
                _this.prev = initData.data.prev;
                _this.next = initData.data.next;
            }
            VideosController.prototype.previousVideos = function () {
                var _this = this;
                _this.reset();
                if (_this.prev) {
                    _this.YoutubeServices.getYouTubeVideos(50, _this.prev).then(function (data) {
                        _this.videos = data.videos;
                        _this.prev = data.prev;
                        _this.next = data.next;
                        _this.animateIn();
                    });
                }
            };
            VideosController.prototype.nextVideos = function () {
                var _this = this;
                _this.reset();
                if (_this.next) {
                    _this.YoutubeServices.getYouTubeVideos(50, _this.next).then(function (data) {
                        _this.videos = data.videos;
                        _this.prev = data.prev;
                        _this.next = data.next;
                        _this.animateIn();
                    });
                }
            };
            VideosController.prototype.reset = function () {
                var _this = this;
                _this.$window.scrollTo(0, 0);
                _this.animateOut();
            };
            VideosController.prototype.animateOut = function () {
                angular.element(document.querySelector('#videos-content')).removeClass('fadeIn');
                angular.element(document.querySelector('#videos-content')).addClass('fadeOut');
            };
            VideosController.prototype.animateIn = function () {
                angular.element(document.querySelector('#videos-content')).removeClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    angular.element(document.querySelector('#videos-content')).addClass('fadeIn');
                });
            };
            VideosController.$inject = ['initData', 'YoutubeServices', '$window'];
            return VideosController;
        })();
        angular.module('controllers').controller('VideosController', VideosController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=videos-controller.js.map