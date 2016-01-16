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
        audio: any;
        promos: any;
        sanitizeHTML(html:string): void;
        subscribe(): void;
        playTrack(index: number): void;
        downloadTrack(url: string): void;
    }

    class HomeController implements IHomeController {
        featuredVideo:any;
        news:any;
        twitter:any;
        youtube:any;
        songs:any;
        subscribeEmail:string;
        audio: any;
        selectedTrackIndex: number;
        promos: any;

        static $inject = ['$sce', 'GlobalServices', 'NewsServices', 'YoutubeServices', 'SoundcloudServices', 'tweets'];

        constructor(private $sce:ISCEService, private GlobalServices:IGlobalServices, private NewsServices:INewsServices, private YoutubeServices:IYoutubeServices, private SoundcloudServices:ISoundcloudServices, private tweets:any) {
            var _this = this;

            _this.audio = document.createElement('audio');

            _this.GlobalServices.getFeaturedVideo().then((data) => {
                _this.featuredVideo = data;
            });

            _this.NewsServices.getNews(8).then((data) => {
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

            _this.promos = [

                {
                    content: [
                        {
                            title: 'Prohibido Buscarte',
                            artists: 'Darkiel',
                            banner: 'https://i1.sndcdn.com/artworks-000127925725-cotg4h-t500x500.jpg',
                            download: 'https://i1.sndcdn.com/artworks-000127925725-cotg4h-t500x500.jpg'
                        },
                        {
                            title: 'Pablo Escobar',
                            artists: 'Kartel Montana',
                            banner: 'https://41.media.tumblr.com/9167887e9d7f1c032d2e35ec2b6e13b5/tumblr_nxs0qckUyn1u7cg9jo1_500.jpg',
                            download: 'https://41.media.tumblr.com/9167887e9d7f1c032d2e35ec2b6e13b5/tumblr_nxs0qckUyn1u7cg9jo1_500.jpg'
                        }
                    ]
                },
                {
                    content: [
                        {
                            title: 'Real G',
                            artists: 'Ñengo Flow',
                            banner: 'http://hw-img.datpiff.com/m384e5c1/Nengo_Flow_Real_G-front-large.jpg',
                            download: 'http://hw-img.datpiff.com/m384e5c1/Nengo_Flow_Real_G-front-large.jpg'
                        },
                        {
                            title: 'El Eslabon Mas Grueso',
                            artists: 'Juanka El Problematik',
                            banner: 'https://i1.sndcdn.com/avatars-000106334666-3pmyuu-t500x500.jpg',
                            download: 'https://i1.sndcdn.com/avatars-000106334666-3pmyuu-t500x500.jpg'
                        }
                    ]
                }

            ];
        }

        playTrack(index: number):void {
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

        downloadTrack(url: string): void {
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

        togglePlayIcons(index: number):void {
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