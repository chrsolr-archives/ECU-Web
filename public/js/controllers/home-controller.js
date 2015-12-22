(function () {
    'use strict';

    angular.module('controllers').controller('HomeController', ['GlobalServices', function (GlobalServices) {

        var vm = this;

        GlobalServices.getFeaturedVideo().then(function(data){
            vm.featuredVideo = data;
        });
    }]);
})();