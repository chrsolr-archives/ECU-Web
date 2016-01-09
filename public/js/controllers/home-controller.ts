///<reference path="../../../typings/tsd.d.ts" />

module app.controllers {

    import ISCEService = angular.ISCEService;
    import IGlobalServices = app.services.IGlobalServices;
    import INewsServices = app.services.INewsServices;
    import IYoutubeServices = app.services.IYoutubeServices;
    import ISoundcloudServices = app.services.ISoundcloudServices;

    interface IHomeController {
        featuredVideo: any;
        news: any;
        twitter: any;
        youtube: any;
        songs: any;
        subscribeEmail: string;
        sanitizeHTML(html: string): void;
        subscribe(): void;
    }

    class HomeController implements IHomeController {
        featuredVideo: any;
        news: any;
        twitter: any;
        youtube: any;
        songs: any;
        subscribeEmail: string;

        static $inject = ['$sce', 'GlobalServices', 'NewsServices', 'YoutubeServices', 'SoundcloudServices', 'tweets'];
        constructor(private $sce: ISCEService, private GlobalServices: IGlobalServices, private NewsServices: INewsServices, private YoutubeServices: IYoutubeServices, private SoundcloudServices: ISoundcloudServices, private tweets: any){
            var _this = this;
            _this.GlobalServices.getFeaturedVideo().then((data) => {
                _this.featuredVideo = data;
            });

            _this.NewsServices.getNews(8).then((data) =>{
                _this.news = data;
            });

            _this.tweets.get({
                widgetId: '680180390867283968'
            }).then(function(data) {
                _this.twitter = data.data.tweets;
            });

            _this.YoutubeServices.getYouTubeVideos(10).then((data) => {
                _this.youtube = data;
            });

            _this.SoundcloudServices.getSoundcloudSongs().then((data) => {
                _this.songs = data.data;
            });
        }

        sanitizeHTML (html: string): void {
            return this.$sce.trustAsHtml(html);
        };

        subscribe(): void {
            this.GlobalServices.subscribe(this.subscribeEmail).then((data) => {
                if (!data.success) console.error(data);

                alert(data.message);

                this.subscribeEmail = '';
            });
        };
    }

    angular.module('controllers')
        .controller('HomeController', HomeController);
}