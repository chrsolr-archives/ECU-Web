(function(){
    'use strict';
    
    angular.module('directives').directive('ecuMediaImage', [function(){
        
        return {
            scope: {
                url: '@',
                title: '@',
                description: '@',
                imageUrl: '@'
            },
            restrict: 'E',
            replace: true,
            templateUrl: '/js/directives/media/media-image-directive.html'
        }
    }]);
})();