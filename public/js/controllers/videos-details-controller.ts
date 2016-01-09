///<reference path="../../../typings/tsd.d.ts" />

module app.controllers {
    'use strict';
    
    interface IVideosDetailsController {
        video: any;
    }
    
    class VideosDetailsController implements IVideosDetailsController {
        video: any;
        
        static $inject = ['initData'];
        constructor(private initData: any){
            this.video = initData.video;
        }
    }
    
    angular.module('controllers')
        .controller('VideosDetailsController', VideosDetailsController);
}