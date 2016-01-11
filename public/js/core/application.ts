///<reference path="../../../typings/tsd.d.ts" />

((): void => {
    'use strict';

    angular.module('services', []);
    angular.module('controllers', []);
    angular.module('filters', []);
    angular.module('directives', []);

    var modules = ['services', 'controllers', 'filters', 'directives', 'ngRoute', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngTweets'];

    angular.module('app', modules);

})();