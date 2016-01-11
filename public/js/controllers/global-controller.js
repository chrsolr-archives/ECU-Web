(function () {
    'use strict';

    angular.module('controllers').controller('GlobalController', ['$scope', '$location', 'NavigationServices', '$uibModal', '$uibModalStack', 'GlobalServices', '$interval', '$window', '$document', 'SoundcloudServices',
        function ($scope, $location, NavigationServices, $uibModal, $uibModalStack, GlobalServices, $interval, $window, $document, SoundcloudServices) {

            var global = this;

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


            $scope.$on('navigation:sidebar', function (event, data) {
                global.isSideBarOpen = data;
            });

            navBar();

            function navBar() {
                var docWindow = angular.element($window);
                var $nav = $document.find('.navigation-bar-wrapper');
                var $sideBar = $document.find('.navigation-bar-sidebar-wrapper');
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
                    } else {
                        if (top + docWindow.height() < angular.element($document).height()) {
                            $nav.removeClass('navigation-bar-toggle');
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