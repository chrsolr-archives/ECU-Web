(function () {
    'use strict';
    angular.module('controllers').controller('GlobalController', ['$scope', 'NavigationServices', '$uibModal', '$uibModalStack', 'GlobalServices',
        function ($scope, NavigationServices, $uibModal, $uibModalStack, GlobalServices) {
            var global = this;
            global.contactUs = function () {
                $uibModal.open({
                    templateUrl: '/views/contact-us-modal.html',
                    controller: 'GlobalController',
                    controllerAs: 'global'
                });
                NavigationServices.closeSideBar();
            };
            global.sendContactUs = function () {
                GlobalServices.contactUs(global.contact).then(function () {
                    $uibModalStack.dismissAll();
                });
            };
            global.cancelContactUs = function () {
                $uibModalStack.dismissAll();
            };
            $scope.$on('navigation:sidebar', function (event, data) {
                global.isSideBarOpen = data;
            });
        }]);
})();
//# sourceMappingURL=global-controller.js.map