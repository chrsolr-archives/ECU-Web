///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        'use strict';
        var VideosDetailsController = (function () {
            function VideosDetailsController(initData) {
                this.initData = initData;
                this.video = initData.video;
            }
            VideosDetailsController.$inject = ['initData'];
            return VideosDetailsController;
        })();
        angular.module('controllers')
            .controller('VideosDetailsController', VideosDetailsController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=videos-details-controller.js.map