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
            templateUrl: '/js/directives/media/media-image-directive.html'
        }
    }]);
})();