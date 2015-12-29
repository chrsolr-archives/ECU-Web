(function () {
    'use strict';

    angular.module('controllers').controller('VideosController', ['YoutubeServices', '$window',
        function (YoutubeServices, $window) {

            var vm = this;

            YoutubeServices.getYouTubeVideos(50).then(function (data) {
                vm.videos = data.videos;
                vm.prev = data.prev;
                vm.next = data.next;
            });

            vm.previousVideos = function () {
                clear();

                if (vm.prev) {
                    YoutubeServices.getYouTubeVideos(50, vm.prev).then(function (data) {
                        vm.videos = data.videos;
                        vm.prev = data.prev;
                        vm.next = data.next;
                        animateIn();
                    });
                }
            };

            vm.nextVideos = function () {
                clear();

                if (vm.next) {
                    YoutubeServices.getYouTubeVideos(50, vm.next).then(function (data) {
                        vm.videos = data.videos;
                        vm.prev = data.prev;
                        vm.next = data.next;
                        animateIn();
                    });
                }
            };

            function clear() {
                $window.scrollTo(0, 0);
                animateOut();
            }

            function animateOut() {
                angular.element(document.querySelector('#videos-content')).removeClass('fadeIn');
                angular.element(document.querySelector('#videos-content')).addClass('fadeOut');
            }

            function animateIn() {
                angular.element(document.querySelector('#videos-content')).removeClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    angular.element(document.querySelector('#videos-content')).addClass('fadeIn');
                });
            }
        }]);
})();