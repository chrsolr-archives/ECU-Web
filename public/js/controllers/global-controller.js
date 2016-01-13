(function () {
    'use strict';
    angular.module('controllers').controller('GlobalController', ['$scope', 'NavigationServices', '$uibModal', '$uibModalStack', 'GlobalServices', 'vcRecaptchaService',
        function ($scope, NavigationServices, $uibModal, $uibModalStack, GlobalServices, vcRecaptchaService) {
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
            global.setWidgetId = function (widgetId) {
                console.info('Created widget ID: %s', widgetId);
            };
            global.setResponse = function (response) {
                console.info('Response available');
            };
            global.cbExpiration = function () {
                console.info('Captcha expired. Resetting response object');
            };
        }]);
})();
//# sourceMappingURL=global-controller.js.map