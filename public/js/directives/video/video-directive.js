(function(){
    'use strict';
    
    angular.module('directives').directive('ecuVideo', [function(){
        
        return {
            scope: {
                video: '='
            },
            restrict: 'E',
            templateUrl: '/video-directive.html'
        }
    }]);
})();