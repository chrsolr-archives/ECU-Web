(function(){
    'use strict';
    
    angular.module('directives').directive('ecuMediaImage', [function(){
        
        return {
            scope: {
                destinationUrl: '@',
                // title: '@',
                // description: '@',
                // imageUrl: '@',
                media: '='
            },
            restrict: 'E',
            templateUrl: '/js/directives/media/media-image-directive.html',
            controller: function($scope){
                console.log($scope);
                                
                var url = permalink = $scope.media.permalink || $scope.media.id;
                
                $scope.media.url = url;
                
                console.log(url);

            }
        }
    }]);
})();