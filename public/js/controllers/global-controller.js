(function () {
    'use strict';

    angular.module('controllers').controller('GlobalController', ['$scope', '$location', 'NavigationServices', '$uibModal', '$uibModalStack', 'GlobalServices', '$interval', '$window', '$document', 'SoundcloudServices',
        function ($scope, $location, NavigationServices, $uibModal, $uibModalStack, GlobalServices, $interval, $window, $document, SoundcloudServices) {

            var global = this;
            global.isAudioPlaying = false;
            global.selectedTrackIndex = 0;
            global.scPlayer = new SoundCloud('500f3c5cdcf76cb1bcc8c35e97864840');

            SoundcloudServices.getSoundcouldSongs().then(function (data) {
                global.songs = data.data;
                global.selectedTrack = global.songs[global.selectedTrackIndex];
            });

            global.contactUs = function () {
                $uibModal.open({
                    templateUrl: '/views/contact-us-modal.html',
                    controller: 'GlobalController',
                    controllerAs: 'global'
                });

                NavigationServices.closeSideBar();
            };

            global.sendContactUs = function () {
                GlobalServices.contactUs(global.contact).then(function () {
                    $uibModalStack.dismissAll();
                })
            };

            global.playSong = function (index) {
                if (index < 0) index = 0;

                if (index >= global.songs.length) index = global.songs.length - 1;

                global.selectedTrack = global.songs[index];
                global.selectedTrackIndex = index;

                if (global.scPlayer.playing) global.scPlayer.pause();

                global.scPlayer.resolve(global.selectedTrack.url, function (err, track) {
                    global.scPlayer.play();

                    $document.find('.soundcloud-player-wrapper').removeClass('soundcloud-player-show');
                    $document.find('html, body').removeClass('no-scroll');
                });
            };

            global.stopSong = function () {
                if (global.scPlayer.playing) {
                    global.scPlayer.pause();
                }
            };

            global.downloadSong = function (index) {
                window.open(global.songs[index].download_url);
            };

            global.togglePlaylist = function () {
                var $playlist = $document.find('.soundcloud-player-wrapper');
                var $body = $document.find('html, body');
                var isOpen = $playlist.hasClass('soundcloud-player-show');
                
                if (isOpen) {
                    $playlist.removeClass('soundcloud-player-show');
                    $body.removeClass('no-scroll');
                } else {
                    $playlist.addClass('soundcloud-player-show');
                    $body.addClass('no-scroll');
                }
            };

            $scope.$on('navigation:sidebar', function (event, data) {
                global.isSideBarOpen = data;
            });

            navBar();

            function navBar() {
                var docWindow = angular.element($window);
                var $nav = $document.find('.navigation-bar-wrapper');
                var $sideBar = $document.find('.navigation-bar-sidebar-wrapper');
                var $soundcloud = $document.find('.soundcloud-player-wrapper');
                var lastPosition = 0;
                var isScrolled = false;
                var delta = 5;

                docWindow.bind("scroll", function () {
                    isScrolled = true;
                });

                function onHasScrolled() {
                    //noinspection JSValidateTypes
                    var top = docWindow.scrollTop();

                    if (Math.abs(lastPosition - top) <= delta)
                        return;

                    //noinspection JSValidateTypes
                    if ((top > lastPosition) && (top > $nav.outerHeight())) {
                        $nav.addClass('navigation-bar-toggle');
                        $sideBar.removeClass('navigation-bar-sidebar-toggle');
                        $soundcloud.addClass('soundcloud-player-hide');
                    } else {
                        if (top + docWindow.height() < angular.element($document).height()) {
                            $nav.removeClass('navigation-bar-toggle');
                            $soundcloud.removeClass('soundcloud-player-hide');
                        }
                    }

                    lastPosition = top;
                }

                $interval(function () {

                    if (isScrolled) {
                        onHasScrolled();
                        isScrolled = false;
                    }

                }, 250);
            }

        }]);
})();