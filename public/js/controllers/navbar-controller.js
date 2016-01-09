///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var NavbarController = (function () {
            function NavbarController($scope, $location, NavigationServices) {
                this.$location = $location;
                this.NavigationServices = NavigationServices;
                var _this = this;
                _this.isSideBarOpen = this.NavigationServices.getSideBarState();
                $scope.$on('navigation:sidebar', function (event, data) {
                    _this.isSideBarOpen = data;
                });
            }
            NavbarController.prototype.toggleSideBar = function () {
                this.NavigationServices.toggleSideBar();
            };
            NavbarController.$inject = ['$scope', '$location', 'NavigationServices'];
            return NavbarController;
        })();
        angular.module('controllers')
            .controller('NavigationController', NavbarController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=navbar-controller.js.map