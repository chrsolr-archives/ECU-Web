(function () {
    'use strict';

    angular.module('controllers').controller('VideosDetailsController', ['initData', function (initData) {

        var vm = this;
        vm.video = initData.video;

    }]);
})();