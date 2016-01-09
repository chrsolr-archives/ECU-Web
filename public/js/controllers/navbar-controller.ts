///<reference path="../../../typings/tsd.d.ts" />

module app.controllers {

    import IScope = ng.IScope;
    import ILocationService = ng.ILocationService;
    import INavigationServices = app.services.INavigationServices;

    interface INavbarController {
        isSideBarOpen: boolean;
        toggleSideBar(): void;
    }

    class NavbarController implements INavbarController {
        isSideBarOpen: boolean;

        static $inject = ['$scope', '$location', 'NavigationServices'];
        constructor($scope: IScope, private $location: ILocationService, private NavigationServices: INavigationServices){
            var _this = this;
            _this.isSideBarOpen = this.NavigationServices.getSideBarState();

            $scope.$on('navigation:sidebar', (event: ng.IAngularEvent, data: boolean) => {
                _this.isSideBarOpen = data;
            });
        }

        toggleSideBar(): void {
            this.NavigationServices.toggleSideBar();
        }
    }

    angular.module('controllers')
        .controller('NavigationController', NavbarController);
}