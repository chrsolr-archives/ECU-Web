(function(){
    'use strict';
    
    angular.module('ecu-video', [])
    .directive('ecuVideo', [function(){
        
        return {
            scope: {
                video: '='
            },
            restrict: 'E',
            templateUrl: 'video-directive.html'
        }
    }]);
})();