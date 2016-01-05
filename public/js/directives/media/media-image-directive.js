(function(){
    'use strict';
    
    angular.module('directives').directive('ecuMediaImage', [function(){
        
        return {
            scope: {
                destinationUrl: '@',
                media: '='
            },
            restrict: 'E',
            templateUrl: '/js/directives/media/media-image-directive.html',
            controller: ['$scope', function($scope){
                
                if ($scope.destinationUrl) {
                    var url = $scope.media.permalink || $scope.media.id;
                    $scope.media.url = $scope.destinationUrl + url;
                }
            }]
        }
    }]);
})();