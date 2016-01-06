(function () {
    'use strict';

    angular.module('controllers').controller('VideosDetailsController', ['$routeParams', 'YoutubeServices', 'Video',
        function ($routeParams, YoutubeServices, Video) {

            var vm = this;

            // YoutubeServices.getYouTubeVideoById($routeParams.id).then(function(res){
            //     vm.video = res.data;
            // });
            console.log(Video);
            vm.video = Video;
        }]);
})();