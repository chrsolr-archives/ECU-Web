///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var NewsController = (function () {
            function NewsController(initData) {
                var _this = this;
                _this.news = initData.data;
            }
            NewsController.$inject = ['initData'];
            return NewsController;
        })();
        angular.module('controllers')
            .controller('NewsController', NewsController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=news-controller.js.map