(function () {
    'use strict';

    angular.module('controllers').controller('NewsDetailsController', ['NewsServices', '$routeParams', '$sce',
        function (NewsServices, $routeParams, $sce) {

            var vm = this;

            NewsServices.getNewsByPermalink($routeParams.permalink).then(function (data) {
                vm.news = data;
            });

            vm.sanitizeHTML = function (html) {
                return $sce.trustAsHtml(html);
            };
        }]);
})();