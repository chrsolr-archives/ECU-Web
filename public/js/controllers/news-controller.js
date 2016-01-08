(function () {
    'use strict';

    angular.module('controllers').controller('NewsController', ['initData',
        function (initData) {
            var vm = this;
            vm.news = initData.data;
        }]);
})();