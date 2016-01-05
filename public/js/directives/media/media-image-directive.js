(function(){
    'use strict';
    
    angular.module('directives').directive('ecuMediaImage', [function(){
        
        return {
            scope: {
                url: '@',
                title: '@',
                description: '@',
                imageUrl: '@',
                media: '='
            },
            restrict: 'E',
            templateUrl: '/js/directives/media/media-image-directive.html',
            controller: function($scope){
                console.log($scope);
            }
        }
    }]);
})();