///<reference path="../../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('services', []);
    angular.module('controllers', []);
    angular.module('filters', []);
    angular.module('directives', []);
    var modules = ['services', 'controllers', 'filters', 'directives', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'angular-loading-bar', 'ngTweets', 'vcRecaptcha'];
    angular.module('app', modules);
})();
//# sourceMappingURL=application.js.map