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
                var vm = this;
                vm.videos = initData.data.videos;
                vm.prev = initData.data.prev;
                vm.next = initData.data.next;
                vm.previousVideos = function () {
                    var _this = this;
                    this.reset();
                    if (vm.prev) {
                        YoutubeServices.getYouTubeVideos(50, vm.prev).then(function (data) {
                            vm.videos = data.videos;
                            vm.prev = data.prev;
                            vm.next = data.next;
                            _this.animateIn();
                        });
                    }
                };
                vm.nextVideos = function () {
                    var _this = this;
                    this.reset();
                    if (vm.next) {
                        YoutubeServices.getYouTubeVideos(50, vm.next).then(function (data) {
                            vm.videos = data.videos;
                            vm.prev = data.prev;
                            vm.next = data.next;
                            _this.animateIn();
                        });
                    }
                };
            }
            VideosController.prototype.reset = function () {
                this.$window.scrollTo(0, 0);
                this.animateOut();
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
