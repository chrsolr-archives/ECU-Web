///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../services/data-services.ts" />

module app.controllers {

    import ISCEService = angular.ISCEService;
    import IGlobalServices = app.services.IGlobalServices;
    import IYoutubeServices = app.services.IYoutubeServices;
    import ISoundcloudServices = app.services.ISoundcloudServices;
    import IDataServices = app.services.IDataServices;
    import IRootScopeService = angular.IRootScopeService;

    interface IHomeController {
        featuredVideo: any;
        news: any;
        twitter: any;
        youtube: any;
        songs: any;
        subscribeEmail: string;
        audio: any;
        promos: any;
        sanitizeHTML(html:string): void;
        subscribe(): void;
        playTrack(index:number): void;
        downloadTrack(url:string): void;
        subscribeWithFacebook(): void;
    }

    class HomeController implements IHomeController {
        featuredVideo:any;
        news:any;
        twitter:any;
        youtube:any;
        songs:any;
        subscribeEmail:string;
        audio:any;
        selectedTrackIndex:number;
        promos:any;

        static $inject = ['$sce', 'GlobalServices', 'YoutubeServices', 'SoundcloudServices', 'tweets', 'DataServices', 'facebook', '$rootScope'];

        constructor(private $sce:ISCEService, private GlobalServices:IGlobalServices,
                    private YoutubeServices:IYoutubeServices, private SoundcloudServices:ISoundcloudServices,
                    private tweets:any, private DataServices:IDataServices, private facebook:any, private $rootScope:IRootScopeService) {
            var _this = this;

            _this.audio = document.createElement('audio');

            _this.GlobalServices.getFeaturedVideo().then((data) => {
                _this.featuredVideo = data;
            });

            _this.DataServices.getNews().then((data) => {
                _this.news = data;
            });

            _this.tweets.get({
                widgetId: '680180390867283968'
            }).then((data) => {
                _this.twitter = data.data.tweets;
            });

            _this.YoutubeServices.getYouTubeVideos(10).then((data) => {
                _this.youtube = data;
            });

            _this.SoundcloudServices.getSoundcloudSongs().then((data) => {
                _this.songs = data.data;
            });

            _this.DataServices.getPromos().then((data) => {
                _this.promos = data;
            });

            $rootScope.$on("fb.init", () => {

            });
        }

        playTrack(index:number):void {
            var _this = this;

            if (index < 0) index = 0;

            if (index >= _this.songs.length) index = _this.songs.length - 1;

            if (_this.selectedTrackIndex === index) {
                _this.audio.pause();
                _this.clearPlayTrackIcons();
                return;
            }

            _this.selectedTrackIndex = index;

            _this.audio.setAttribute('src', _this.songs[index].stream_url);

            _this.audio.play();

            _this.togglePlayIcons(index);
        }

        downloadTrack(url:string):void {
            window.open(url);
        }

        sanitizeHTML(html:string):void {
            return this.$sce.trustAsHtml(html);
        }

        subscribe():void {
            var _this = this;

            _this.GlobalServices.subscribe(_this.subscribeEmail).then((data) => {
                if (!data.success) console.error(data);

                alert(data.message);

                _this.subscribeEmail = '';
            });
        }

        subscribeWithFacebook():void {
            var _this = this;

            _this.facebook.getUser(null, {fields: 'name, email'}).then((data) => {
                var user = data.user;

                _this.GlobalServices.subscribe(user.email, user.name).then((data) => {
                    if (!data.success) console.error(data);

                    alert(data.message);

                    _this.subscribeEmail = '';
                });

            }, (err) => {
                console.log(err);
            });
        }

        togglePlayIcons(index:number):void {
            this.clearPlayTrackIcons();
            angular.element(document.querySelector('.sc-play-stop-' + index)).removeClass('pe-7s-play').addClass('pe-7s-close');
        }

        clearPlayTrackIcons():void {
            angular.element(document).find('[class*="sc-play-stop-"]').removeClass('pe-7s-close').addClass('pe-7s-play');
        }
    }

    angular.module('controllers')
        .controller('HomeController', HomeController);
}