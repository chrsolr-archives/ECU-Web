(function () {
    'use strict';

    angular.module('controllers').controller('VideosDetailsController', ['$routeParams', 'YoutubeServices',
        function ($routeParams, YoutubeServices) {

            var vm = this;

            YoutubeServices.getYouTubeVideoById($routeParams.id).then(function(res){
                vm.video = res.data;
            });
        }]);
})();