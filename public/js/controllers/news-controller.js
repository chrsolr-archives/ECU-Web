(function () {
    'use strict';

    angular.module('controllers').controller('NewsController', ['NewsServices',
        function (NewsServices) {

            var vm = this;

            NewsServices.getNews(50).then(function (data) {
                vm.news = data;
            });
        }]);
})();