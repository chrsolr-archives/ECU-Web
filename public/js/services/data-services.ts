///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    'use strict';

    export interface IDataServices {
        getFeaturedVideo(): ng.IPromise<any>;
        getPromos(): ng.IPromise<any>;
        getNews(max?:number): ng.IPromise<any>;
        getNewsByPermalink(permalink:string): ng.IPromise<any>;
    }

    class DataServices implements IDataServices {
        news:any[];
        promos:any[];
        featuredVideo:any;

        static $inject = ['$http', '$q'];

        constructor(private $http:ng.IHttpService, private $q:ng.IQService) {
            this.news = [];
            this.promos = [];
        }

        /**
         * Gets featured video. if the show is on air,
         * then it return the ustream url
         * @returns {IPromise<T>}
         */
        getFeaturedVideo():ng.IPromise<any> {
            var _this = this;
            var q = _this.$q.defer();

            if ((new Date().getUTCDay() === 1 && new Date().getUTCHours() >= 23) ||
                (new Date().getUTCDay() === 2 && new Date().getUTCHours() <= 2)) {
                _this.featuredVideo = {
                    title: 'Live Stream',
                    url: 'http://www.ustream.tv/embed/10266764?v=3&amp;wmode=direct'
                };

                q.resolve(_this.featuredVideo);

                return q.promise;
            }

            if (_this.featuredVideo) {
                q.resolve(_this.featuredVideo);

                return q.promise;
            }

            _this.$http.get('/api/featuredvideo')
                .success((res: string) => {
                    _this.featuredVideo = {
                        title: 'Video del Dia',
                        url: res
                    };
                    q.resolve(_this.featuredVideo);
                });

            return q.promise;
        }

        /**
         * Get Latest Promos
         * @returns {IPromise<T>}
         */
        getPromos():ng.IPromise<any> {
            var _this = this;
            var q = _this.$q.defer();

            if (_this.promos.length === 0) {

                _this.$http.get('/api/promos').success((res:any[]) => {

                    for (let i = 0; i < res.length; i++) {
                        if (i % 2 === 0) {
                            var content = {content: []};
                            content.content.push(res[i]);
                            content.content.push(res[i + 1]);

                            _this.promos.push(content);
                        }
                    }

                    q.resolve(_this.promos);
                });

                return q.promise;
            }

            q.resolve(_this.promos);

            return q.promise;
        }

        getNews(max?:number):ng.IPromise<any> {






            var _this = this;
            var q = _this.$q.defer();

            if (_this.news.length === 0) {
                var limit = max || 50;
                
                _this.$http.get('/api/news?limit=' + limit).success((data) => {
                    console.log(data);
                    q.resolve(data);
                }, (error) => {
                    q.reject("Error: " + error.code + " " + error.message);
                });

                return q.promise;
            }

            q.resolve(_this.news);

            return q.promise;





            // var _this = this;
            // var q = _this.$q.defer();

            // if (_this.news.length === 0) {
            //     var queryLimit = max || 50;

            //     var news = new Parse.Object("News");
            //     var query = new Parse.Query(news)

            //     query.descending('createdAt');
            //     query.equalTo('isActive', true);
            //     query.limit(queryLimit);

            //     query.find().then((objects) => {
            //         var data = [];

            //         angular.forEach(objects, (value, key) => {
            //             data.push(value.toJSON());
            //         });

            //         _this.news = data;

            //         q.resolve(_this.news);
            //     }, (error) => {
            //         q.reject("Error: " + error.code + " " + error.message);
            //     });

            //     return q.promise;
            // }

            // q.resolve(_this.news);

            // return q.promise;
        }

        getNewsByPermalink(permalink:string):ng.IPromise<any> {
            var _this = this;
            var q = _this.$q.defer();

            if (_this.news.length === 0) {
                var news = new Parse.Object("News");
                var query = new Parse.Query(news);
                query.equalTo('permalink', permalink);
                query.first().then((object) => {
                    q.resolve(object.toJSON());
                }, (error) => {
                    q.reject("Error: " + error.code + " " + error.message);
                });

                return q.promise;
            }

            var data = {};
            for (var i in _this.news) {
                if (_this.news[i].permalink === permalink) {
                    data = _this.news[i];
                    break
                }
            }

            q.resolve(data);

            return q.promise;
        }
    }

    angular.module('services')
        .service('DataServices', DataServices);
}