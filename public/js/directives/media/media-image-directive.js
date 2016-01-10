///<reference path="../../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var directives;
    (function (directives) {
        var MediaImageDirective = (function () {
            function MediaImageDirective($scope) {
                this.$scope = $scope;
                if ($scope.destinationUrl) {
                    var url = $scope.media.permalink || $scope.media.id;
                    $scope.media.url = $scope.destinationUrl + url;
                }
            }
            MediaImageDirective.$inject = ['$scope'];
            return MediaImageDirective;
        })();
        directives.MediaImageDirective = MediaImageDirective;
        angular.module('directives').directive('ecuMediaImage', function () {
            return {
                scope: {
                    destinationUrl: '@',
                    media: '='
                },
                restrict: 'E',
                templateUrl: '/js/directives/media/media-image-directive.html',
                controller: MediaImageDirective
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=media-image-directive.js.map