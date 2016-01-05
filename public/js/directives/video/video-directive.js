(function(){
    'use strict';
    
    angular.module('directives').directive('ecuVideo', [function(){
        
        return {
            scope: {
                video: '='
            },
            restrict: 'E',
            replace: true,
            templateUrl: '/js/directives/video/video-directive.html'
        }
    }]);
})();