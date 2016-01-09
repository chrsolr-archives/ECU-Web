///<reference path="../../../typings/tsd.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        'use strict';
        var VideosDetailsController = (function () {
            function VideosDetailsController(initData) {
                var vm = this;
                vm.video = initData.video;
            }
            VideosDetailsController.$inject = ['initData'];
            return VideosDetailsController;
        })();
        angular
            .module('controllers').controller('VideosDetailsController', VideosDetailsController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
