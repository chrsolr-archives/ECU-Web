///<reference path="../../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app').run(run);
    run.$inject = ['$rootScope', 'NavigationServices', 'GlobalServices'];
    function run($rootScope, NavigationServices, GlobalServices) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            NavigationServices.closeSideBar();
        });
    }
})();
//# sourceMappingURL=application-run.js.map