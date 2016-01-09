///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../services/youtube-services.ts" />

import IYoutubeServices = app.services.IYoutubeServices;

module app.controllers {
    'use strict';

    interface IVideosController {
        videos: any;
        prev: string;
        next: string;
        previousVideos: any;
        nextVideos: any;
        reset(): void;
    }

    class VideosController implements IVideosController {
        videos: any;
        prev: string;
        next: string;
        previousVideos: any;
        nextVideos: any;
        reset(): void;

        static $inject = ['initData', 'YoutubeServices', '$window'];
        constructor(initData: any, private YoutubeServices: IYoutubeServices, private $window: ng.IWindowService) {
            let vm = this;
            vm.videos = initData.data.videos;
            vm.prev = initData.data.prev;
            vm.next = initData.data.next;

            vm.previousVideos = function() {
                this.reset();
       
                if (vm.prev) {
                    YoutubeServices.getYouTubeVideos(50, vm.prev).then((data) => {
                        vm.videos = data.videos;
                        vm.prev = data.prev;
                        vm.next = data.next;
                        this.animateIn();
                    });
                }
            };

            vm.nextVideos = function() {
                this.reset();

                if (vm.next) {
                    YoutubeServices.getYouTubeVideos(50, vm.next).then((data) => {
                        vm.videos = data.videos;
                        vm.prev = data.prev;
                        vm.next = data.next;
                        this.animateIn();
                    });
                }
            };
        }

        reset(): void {
            this.$window.scrollTo(0, 0);
            this.animateOut();
        }

        animateOut(): void {
            angular.element(document.querySelector('#videos-content')).removeClass('fadeIn');
            angular.element(document.querySelector('#videos-content')).addClass('fadeOut');
        }

        animateIn(): void {
            angular.element(document.querySelector('#videos-content')).removeClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                angular.element(document.querySelector('#videos-content')).addClass('fadeIn');
            });
        }
    }

    angular.module('controllers').controller('VideosController', VideosController);
}