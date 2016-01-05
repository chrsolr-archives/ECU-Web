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
                                
                var url = $scope.media.permalink || $scope.media.id;
                
                $scope.media.url = $scope.destinationUrl + url;
                
                console.log(url);

            }
        }
    }]);
})();