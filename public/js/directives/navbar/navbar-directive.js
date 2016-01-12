///<reference path="../../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var directives;
    (function (directives) {
        var NavbarDirective = (function () {
            function NavbarDirective($scope, NavigationServices, $interval, $window, $document) {
                this.NavigationServices = NavigationServices;
                this.$interval = $interval;
                this.$window = $window;
                this.$document = $document;
                var _this = this;
                _this.isSideBarOpen = _this.NavigationServices.getSideBarState();
                $scope.$on('navigation:sidebar', function (event, data) {
                    _this.isSideBarOpen = data;
                });
                _this.navbar();
            }
            NavbarDirective.prototype.toggleSideBar = function () {
                this.NavigationServices.toggleSideBar();
            };
            NavbarDirective.prototype.navbar = function () {
                var _this = this;
                var docWindow = angular.element(_this.$window);
                var $nav = _this.$document.find('.navigation-bar-wrapper');
                var $sideBar = _this.$document.find('.navigation-bar-sidebar-wrapper');
                var lastPosition = 0;
                var isScrolled = false;
                var delta = 5;
                docWindow.bind("scroll", function () {
                    isScrolled = true;
                });
                function onHasScrolled() {
                    var top = docWindow.scrollTop();
                    if (Math.abs(lastPosition - top) <= delta)
                        return;
                    if ((top > lastPosition) && (top > $nav.outerHeight())) {
                        $nav.addClass('navigation-bar-toggle');
                        $sideBar.removeClass('navigation-bar-sidebar-toggle');
                    }
                    else {
                        if (top + docWindow.height() < angular.element(_this.$document).height()) {
                            $nav.removeClass('navigation-bar-toggle');
                        }
                    }
                    lastPosition = top;
                }
                _this.$interval(function () {
                    if (isScrolled) {
                        onHasScrolled();
                        isScrolled = false;
                    }
                }, 250);
            };
            NavbarDirective.$inject = ['$scope', 'NavigationServices', '$interval', '$window', '$document'];
            return NavbarDirective;
        })();
        directives.NavbarDirective = NavbarDirective;
        angular.module('directives').directive('ecuNavbar', function () {
            return {
                scope: true,
                restrict: 'E',
                templateUrl: '/js/directives/navbar/navbar-directive.html',
                controller: NavbarDirective,
                controllerAs: 'navbar',
                transclude: true
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=navbar-directive.js.map