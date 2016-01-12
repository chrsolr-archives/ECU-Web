///<reference path="../../../../typings/tsd.d.ts" />

module app.directives {

    import IDirective = ng.IDirective;
    import IScope = ng.IScope;
    import INavigationServices = app.services.INavigationServices;
    import IIntervalService = angular.IIntervalService;
    import IWindowService = angular.IWindowService;
    import IDocumentService = angular.IDocumentService;

    export class NavbarDirective {
        isSideBarOpen: boolean;

        static $inject = ['$scope', 'NavigationServices', '$interval', '$window', '$document'];
        constructor($scope: any, private NavigationServices: INavigationServices, private $interval: IIntervalService, private $window: IWindowService, private $document: IDocumentService) {
            var _this = this;

            _this.isSideBarOpen = _this.NavigationServices.getSideBarState();

            $scope.$on('navigation:sidebar', (event: ng.IAngularEvent, data: boolean) => {
                _this.isSideBarOpen = data;
            });

            _this.navbar();
        }

        toggleSideBar(): void {
            this.NavigationServices.toggleSideBar();
        }

        navbar(): void {
                var _this = this;

                var docWindow = angular.element(_this.$window);
                var $nav = _this.$document.find('.navigation-bar-wrapper');
                var $sideBar = _this.$document.find('.navigation-bar-sidebar-wrapper');
                var lastPosition = 0;
                var isScrolled = false;
                var delta = 5;

                docWindow.bind("scroll", () => {
                    isScrolled = true;
                });

                function onHasScrolled() {
                    var top = docWindow.scrollTop();

                    if (Math.abs(lastPosition - top) <= delta)
                        return;

                    if ((top > lastPosition) && (top > $nav.outerHeight())) {
                        $nav.addClass('navigation-bar-toggle');
                        $sideBar.removeClass('navigation-bar-sidebar-toggle');
                    } else {
                        if (top + docWindow.height() < angular.element(_this.$document).height()) {
                            $nav.removeClass('navigation-bar-toggle');
                        }
                    }

                    lastPosition = top;
                }

                _this.$interval(() => {

                    if (isScrolled) {
                        onHasScrolled();
                        isScrolled = false;
                    }

                }, 250);
        }
    }

    angular.module('directives').directive('ecuNavbar', (): IDirective => {
        return {
            scope: true,
            restrict: 'E',
            templateUrl: '/js/directives/navbar/navbar-directive.html',
            controller: NavbarDirective,
            controllerAs: 'navbar',
            transclude: true
        }
    });

}