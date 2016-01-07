///<reference path="../../../typings/tsd.d.ts" />

import IRouteResolverService = app.services.IRouteResolverService;

((): void => {
    'use strict';

    angular.module('app').config(config);
    
    config.$inject = ['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', '$sceProvider'];

    function config(
            $routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider, 
            cfpLoadingBarProvider: ng.loadingBar.ILoadingBarProvider, $sceProvider: ng.ISCEProvider
        ): void {
        
        $routeProvider.when('/', {
            templateUrl: '/views/home.html',
            caseInsensitiveMatch: true,
            controller: 'HomeController',
            controllerAs: 'vm'
        }).when('/news', {
            templateUrl: '/views/news.html',
            caseInsensitiveMatch: true,
            controller: 'NewsController',
            controllerAs: 'vm'
        }).when('/news/details/:permalink', {
            templateUrl: '/views/news-details.html',
            caseInsensitiveMatch: true,
            controller: 'NewsDetailsController',
            controllerAs: 'vm'
        }).when('/videos', {
            templateUrl: '/views/videos.html',
            caseInsensitiveMatch: true,
            controller: 'VideosController',
            controllerAs: 'vm',
            resolve: {
                initData: ['$route', 'RouteResolverServices', ($route: ng.route.IRouteService, RouteResolverServices: IRouteResolverService): any => {
                    return RouteResolverServices.resolveVideos(50);
                }]
            }
        }).when('/videos/details/:id', {
            templateUrl: '/views/videos-details.html',
            caseInsensitiveMatch: true,
            controller: 'VideosDetailsController',
            controllerAs: 'vm',
            resolve: {
                initData: ['$route', 'RouteResolverServices', ($route: ng.route.IRouteService, RouteResolverServices: IRouteResolverService): any => {
                    return RouteResolverServices.resolveVideosDetails($route.current.params.id);
                }]
            }
        }).when('/about', {
            templateUrl: '/views/about.html',
            caseInsensitiveMatch: true
        }).when('/policies', {
            templateUrl: '/views/policies.html',
            caseInsensitiveMatch: true
        }).when('/termsofuse', {
            templateUrl: '/views/terms-of-use.html',
            caseInsensitiveMatch: true
        }).otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

        cfpLoadingBarProvider.includeSpinner = false;

        $sceProvider.enabled(false);
    }
})();