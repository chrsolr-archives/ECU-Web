///<reference path="../../../typings/tsd.d.ts" />

((): void => {
    'use strict';

    //Parse.initialize('Mw0dWtJQYVzYlA4vHybSNmuyLJSjzpEpTarhZMEQ', 'gXEJhvTtHQcSNrryJ7u9IK4euVWOu00QEGnaK7ow');
    Parse.initialize('aWSciE1mXkreaNl9lC95hkW66oeZZRwdmIXCcD7Y', 'mEMpRwvnHUNKRf9wjyzvEmRSWu1uxb5BcxI0fsRL');

    angular.module('services', []);
    angular.module('controllers', []);
    angular.module('filters', []);
    angular.module('directives', []);

    var modules = ['services', 'controllers', 'filters', 'directives', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'angular-loading-bar', 'ngTweets', 'vcRecaptcha'];

    angular.module('app', modules);

})();