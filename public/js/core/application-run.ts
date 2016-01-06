///<reference path="../../../typings/tsd.d.ts" />

((): void => {
    'use strict';

    angular.module('app').run(run);

    run.$inject = ['$rootScope', 'NavigationServices'];

    function run($rootScope: ng.IRootScopeService, NavigationServices): void {

        $rootScope.$on('$routeChangeStart', (event, next, current): void => {
            NavigationServices.closeSideBar();
        });
    }
})();