///<reference path="../../../typings/tsd.d.ts" />

module app.controllers {
    'use strict';
    
    interface IVideosDetailsController {
        video: any;
    }
    
    class VideosDetailsController implements IVideosDetailsController {
        video: any;
        
        static $inject = ['initData'];
        constructor(initData: any){
            var vm = this;
            vm.video = initData.video;
        }
    }
    
    angular
    .module('controllers').controller('VideosDetailsController', VideosDetailsController);
}