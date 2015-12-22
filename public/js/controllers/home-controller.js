(function () {
    'use strict';

    angular.module('controllers').controller('HomeController', ['GlobalServices', 'NewsServices',
        function (GlobalServices, NewsServices) {

            var vm = this;

            GlobalServices.getFeaturedVideo().then(function (data) {
                vm.featuredVideo = data;
            });

            NewsServices.getNews().then(function(data){
                console.log(data);
                vm.news = data;
            });
        }]);
})();