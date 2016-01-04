(function () {
    'use strict';

    angular.module('controllers').controller('GlobalController', ['$scope', '$location', 'NavigationServices', '$uibModal', '$uibModalStack', 'GlobalServices', '$interval', '$window', '$document', 'SoundcloudServices',
        function ($scope, $location, NavigationServices, $uibModal, $uibModalStack, GlobalServices, $interval, $window, $document, SoundcloudServices) {

            var global = this;
            global.isAudioPlaying = false;
            global.selectedTrackIndex = 0;
            global.track = document.createElement('audio');

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

                if (global.isAudioPlaying) {
                    global.track.pause();
                }

                //global.track = new Audio(global.selectedTrack.stream_url);
                global.track.setAttribute('src', global.selectedTrack.stream_url);
                global.track.load();
                global.track.play();
                global.isAudioPlaying = true;
                
                global.togglePlaylist();
            };

            global.stopSong = function () {
                if (global.isAudioPlaying) {
                    global.track.pause();
                    global.isAudioPlaying = false;
                }
            };

            global.track.onended = function () {
                alert('ended');
                global.playSong(global.selectedTrackIndex + 1);
            };

            global.downloadSong = function (index) {
                window.open(global.songs[index].download_url);
            };

            global.togglePlaylist = function () {
                var $playlist = angular.element(document.querySelector('.soundcloud-player-wrapper'));
                var $body = angular.element(document.body);
                var isOpen = $playlist.hasClass('soundcloud-player-show');
                
                if (isOpen) {
                    $playlist.removeClass('soundcloud-player-show');
                    $body.addClass('no-scroll');
                } else {
                    $playlist.addClass('soundcloud-player-show');
                    $body.removeClass('no-scroll');
                }
                
            };

            $scope.$on('navigation:sidebar', function (event, data) {
                global.isSideBarOpen = data;
            });

            navBar();

            function navBar() {
                var docWindow = angular.element($window);
                var $nav = angular.element(document.querySelector('.navigation-bar-wrapper'));
                var $sideBar = angular.element(document.querySelector('.navigation-bar-sidebar-wrapper'));
                var $soundcloud = angular.element(document.querySelector('.soundcloud-player-wrapper'));
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