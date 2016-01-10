///<reference path="../../../../typings/tsd.d.ts" />

module app.directives {

    import IDirective = ng.IDirective;
    import IScope = ng.IScope;

    export class MediaImageDirective {

        static $inject = ['$scope'];
        constructor(private $scope: any) {
            if ($scope.destinationUrl) {
                var url = $scope.media.permalink || $scope.media.id;
                $scope.media.url = $scope.destinationUrl + url;
            }
        }
    }

    angular.module('directives').directive('ecuMediaImage', (): IDirective => {
        return {
            scope: {
                destinationUrl: '@',
                media: '='
            },
            restrict: 'E',
            templateUrl: '/js/directives/media/media-image-directive.html',
            controller: MediaImageDirective
        }
    });

}