(function () {
    'use strict';

    angular.module('controllers').controller('NewsDetailsController', ['NewsServices', '$routeParams', '$sce',
        function (NewsServices, $routeParams, $sce) {

            var vm = this;

            NewsServices.getNewsByPermalink($routeParams.permalink).then(function (data) {
                vm.news = data;
                setMetadata();
            });

            vm.sanitizeHTML = function (html) {
                return $sce.trustAsHtml(html);
            };

            function setMetadata(){
                document.title = vm.news.title;

                document.querySelector('meta[property="og:title"]').setAttribute('content', vm.news.title);
                document.querySelector('meta[property="og:type"]').setAttribute('content', 'website');
                document.querySelector('meta[property="og:url"]').setAttribute('content', 'http://ecu.herokuapp.com/news/details/' + vm.news.permalink);
                document.querySelector('meta[property="og:image"]').setAttribute('content', vm.news.imageUrl);
                document.querySelector('meta[property="og:description"]').setAttribute('content', vm.news.description);

                document.querySelector('meta[property="twitter:title"]').setAttribute('content', vm.news.title);
                document.querySelector('meta[property="twitter:card"]').setAttribute('content', vm.news.description);
                document.querySelector('meta[property="twitter:url"]').setAttribute('content', 'http://ecu.herokuapp.com/news/details/' + vm.news.permalink);
                document.querySelector('meta[property="twitter:image"]').setAttribute('content', vm.news.imageUrl);
                document.querySelector('meta[property="twitter:description"]').setAttribute('content', vm.news.description);
            }
        }]);
})();