///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../services/youtube-services.ts" />

import IYoutubeServices = app.services.IYoutubeServices;

module app.controllers {
    'use strict';

    interface IVideosController {
        videos: any;
        prev: string;
        next: string;
        previousVideos(): void;
        nextVideos(): void;
        reset(): void;
        animateOut(): void;
        animateIn(): void;
    }

    class VideosController implements IVideosController {
        videos:any;
        prev:string;
        next:string;

        static $inject = ['initData', 'YoutubeServices', '$window'];

        constructor(initData:any, private YoutubeServices:IYoutubeServices, private $window:ng.IWindowService) {
            var _this = this;
            _this.videos = initData.data.videos;
            _this.prev = initData.data.prev;
            _this.next = initData.data.next;
        }

        previousVideos():void {
            var _this = this;
            _this.reset();

            if (_this.prev) {
                _this.YoutubeServices.getYouTubeVideos(50, _this.prev).then((data) => {
                    _this.videos = data.videos;
                    _this.prev = data.prev;
                    _this.next = data.next;
                    _this.animateIn();
                });
            }
        }

        nextVideos():void {
            var _this = this;
            _this.reset();

            if (_this.next) {
                _this.YoutubeServices.getYouTubeVideos(50, _this.next).then((data) => {
                    _this.videos = data.videos;
                    _this.prev = data.prev;
                    _this.next = data.next;
                    _this.animateIn();
                });
            }
        }

        reset():void {
            var _this = this;
            _this.$window.scrollTo(0, 0);
            _this.animateOut();
        }

        animateOut():void {
            angular.element(document.querySelector('#videos-content')).removeClass('fadeIn');
            angular.element(document.querySelector('#videos-content')).addClass('fadeOut');
        }

        animateIn():void {
            angular.element(document.querySelector('#videos-content')).removeClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                angular.element(document.querySelector('#videos-content')).addClass('fadeIn');
            });
        }
    }

    angular.module('controllers').controller('VideosController', VideosController);
}