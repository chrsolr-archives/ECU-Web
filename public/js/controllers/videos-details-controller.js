(function () {
    'use strict';

    angular.module('controllers').controller('VideosDetailsController', ['$routeParams', 'YoutubeServices', 'video',
        function ($routeParams, YoutubeServices, video) {

            var vm = this;

            // YoutubeServices.getYouTubeVideoById($routeParams.id).then(function(res){
            //     vm.video = res.data;
            // });
            console.log(video);
            vm.video = video;
        }]);
})();