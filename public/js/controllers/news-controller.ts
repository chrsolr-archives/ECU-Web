///<reference path="../../../typings/tsd.d.ts" />

module app.controllers {

    interface INewsController {
        news: any;
    }

    class NewsController implements INewsController {
        news: any;

        static $inject = ['initData'];
        constructor (initData: any){
            var _this = this;
            _this.news = initData.data;
        }
    }

    angular.module('controllers')
        .controller('NewsController', NewsController);
}