///<reference path="../../../typings/tsd.d.ts" />

module app.controllers {
    import ISCEService = ng.ISCEService;

    interface INewsDetailsController {
        news: any;
        sanitizeHTML(html: string): void;
    }

    class NewsDetailsController implements INewsDetailsController {
        news: any;

        static $inject = ['initData', '$sce'];
        constructor (initData: any, private $sce: ISCEService){
            var _this = this;
            _this.news = initData.data;
        }

        sanitizeHTML(html: string): void {
            return this.$sce.trustAsHtml(html);
        }
    }

    angular.module('controllers')
    .controller('NewsDetailsController', NewsDetailsController);
}