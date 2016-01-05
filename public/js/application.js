(function() {
    'use strict';

    Parse.initialize("Mw0dWtJQYVzYlA4vHybSNmuyLJSjzpEpTarhZMEQ", "gXEJhvTtHQcSNrryJ7u9IK4euVWOu00QEGnaK7ow");

    angular.module('services', []);
    angular.module('controllers', []);
    angular.module('filters', []);
    angular.module('directives', []);

    var modules = ['services', 'controllers', 'filters', 'directives', 'ngRoute', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngTweets'];

    angular.module('app', modules)
        .config(['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', '$sceProvider',
            function($routeProvider, $locationProvider, cfpLoadingBarProvider, $sceProvider) {
                $routeProvider.when('/', {
                    templateUrl: '/views/home.html',
                    caseInsensitiveMatch: true
                }).when('/news', {
                    templateUrl: '/views/news.html',
                    caseInsensitiveMatch: true
                }).when('/news/details/:permalink', {
                    templateUrl: '/views/news-details.html',
                    caseInsensitiveMatch: true
                }).when('/videos', {
                    templateUrl: '/views/videos.html',
                    caseInsensitiveMatch: true
                }).when('/videos/details/:id', {
                    templateUrl: '/views/videos-details.html',
                    caseInsensitiveMatch: true
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
                $locationProvider.hashPrefix('!');

                cfpLoadingBarProvider.includeSpinner = false;

                $sceProvider.enabled(false);
            }

        ]).run(['$rootScope', '$location', 'NavigationServices',
            function($rootScope, $location, NavigationServices) {

                $rootScope.$on('$routeChangeStart', function(event, next, current) {

                    // if (Parse.User.current()) {
                    //     var query = (new Parse.Query(Parse.Role));
                    //     query.equalTo("name", "Admin");
                    //     query.equalTo("users", Parse.User.current());
                    //     query.first().then(function(adminRole) {
                    //         if (!adminRole) {
                    //             $location.path('/no-access');
                    //         }
                    //     });
                    // } else {
                    //     $location.path('/');
                    // }

                    NavigationServices.closeSideBar();
                });
            }
        ]);
})();