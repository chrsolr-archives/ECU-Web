(function () {
    'use strict';

    angular.module('controllers').controller('VideosDetailsController', ['video',
        function (video) {

            var vm = this;
            vm.video = video.data;
        }]);
})();