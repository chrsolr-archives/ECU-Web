///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var NewsDetailsController = (function () {
            function NewsDetailsController(initData, $sce) {
                this.$sce = $sce;
                var _this = this;
                _this.news = initData.data;
            }
            NewsDetailsController.prototype.sanitizeHTML = function (html) {
                return this.$sce.trustAsHtml(html);
            };
            NewsDetailsController.$inject = ['initData', '$sce'];
            return NewsDetailsController;
        })();
        angular.module('controllers')
            .controller('NewsDetailsController', NewsDetailsController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=news-details-controller.js.map