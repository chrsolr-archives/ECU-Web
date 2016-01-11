///<reference path="../../../typings/tsd.d.ts" />

import IGlobalServices = app.services.IGlobalServices;
import INavigationServices = app.services.INavigationServices;

((): void => {
    'use strict';

    angular.module('app').run(run);

    run.$inject = ['$rootScope', 'NavigationServices', 'GlobalServices'];

    function run($rootScope: ng.IRootScopeService, NavigationServices: INavigationServices, GlobalServices: IGlobalServices): void {

        GlobalServices.getParseKeys().then((data) => {
            Parse.initialize(data.app_key, data.client_key);
        });

        $rootScope.$on('$routeChangeStart', (event, next, current): void => {
            NavigationServices.closeSideBar();
        });
    }
})();