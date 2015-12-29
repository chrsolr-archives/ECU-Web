(function () {
    'use strict';

    angular.module('controllers').controller('GlobalController', ['$location', 'NavigationServices', '$uibModal', '$uibModalStack', 'GlobalServices', '$interval', '$window', '$document',
        function ($location, NavigationServices, $uibModal, $uibModalStack, GlobalServices, $interval, $window, $document) {

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

            NavBar({
                id: 'navigation-bar-wrapper'
            });


            function NavBar(opts) {
                var docWindow = angular.element($window);
                var $nav = angular.element(document.querySelector('.' + opts.id));
                var lastPosition = 0;
                var isScrolled = false;
                var delta = opts.delta || 5;
                var speed = opts.speed || 200;

                docWindow.bind("scroll", function () {
                    isScrolled = true;
                });

                function onHasScrolled() {
                    var top = docWindow.scrollTop();

                    if (Math.abs(lastPosition - top) <= delta)
                        return;

                    if ((top > lastPosition) && (top > $nav.outerHeight())) {

                        angular.element(document.querySelector('.navigation-bar-sidebar-wrapper')).removeClass('navigation-bar-sidebar-toggle');

                        $nav.css({
                            top: '-' + Number($nav.outerHeight() + 10) + 'px',
                            WebkitTransition: 'top ' + speed + 'ms',
                            MozTransition: 'top ' + speed + 'ms',
                            MsTransition: 'top ' + speed + 'ms',
                            OTransition: 'top ' + speed + 'ms',
                            transition: 'top ' + speed + 'ms'
                        }, speed);
                    } else {
                        if (top + docWindow.height() < angular.element($document).height()) {
                            $nav.css({
                                top: '0px',
                                WebkitTransition: 'top ' + speed + 'ms',
                                MozTransition: 'top ' + speed + 'ms',
                                MsTransition: 'top ' + speed + 'ms',
                                OTransition: 'top ' + speed + 'ms',
                                transition: 'top ' + speed + 'ms'
                            }, speed);
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