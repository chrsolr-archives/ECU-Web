(function () {
    'use strict';

    angular.module('controllers').controller('GlobalController', ['$location', 'NavigationServices', '$uibModal', '$uibModalStack', 'GlobalServices',
        function ($location, NavigationServices, $uibModal, $uibModalStack, GlobalServices) {

            var global = this;

            global.contactUs = function () {
                $uibModal.open({
                    templateUrl: '/views/contact-us-modal.html',
                    controller: 'GlobalController',
                    controllerAs: 'global'
                });

                NavigationServices.closeSideBar();
            };

            global.sendContactUs = function(){
                GlobalServices.contactUs(global.contact).then(function(){
                    $uibModalStack.dismissAll();
                })
            };

        }]);
})();