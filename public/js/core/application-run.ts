((): void => {
    'use strict';

    angular.module('app').run(run);

    run.$inject = ['$rootScope', 'NavigationServices'];

    function run($rootScope: ng.IRootScopeService, NavigationServices) {

        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            NavigationServices.closeSideBar();
        });
    }
})();