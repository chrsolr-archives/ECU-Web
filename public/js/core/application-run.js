///<reference path="../../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app').run(run);
    run.$inject = ['$rootScope', 'NavigationServices', 'GlobalServices'];
    function run($rootScope, NavigationServices, GlobalServices) {
        GlobalServices.getParseKeys().then(function (data) {
            Parse.initialize(data.app_key, data.client_key);
        });
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            NavigationServices.closeSideBar();
        });
    }
})();
//# sourceMappingURL=application-run.js.map