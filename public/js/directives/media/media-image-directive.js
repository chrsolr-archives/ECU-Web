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
            controller: function($scope){

                if (!$scope.media.url) {
                    var url = $scope.media.permalink || $scope.media.id;
                    $scope.media.url = $scope.destinationUrl + url;
                }
            }
        }
    }]);
})();