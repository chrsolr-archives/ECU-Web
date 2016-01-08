///<reference path="../../../typings/tsd.d.ts" />
///<reference path="youtube-services.ts"/>
///<reference path="news-services.ts"/>

import IYoutubeServices = app.services.IYoutubeServices;
import INewsServices = app.services.INewsServices;

module app.services {
    'use strict';

    export interface IRouteResolverServices {
        resolveVideos(max: number): ng.IPromise<any>;
        resolveVideosDetails(videoId: string): ng.IPromise<any>;
        resolveNews(max: number): ng.IPromise<any>;
        resolveNewsDetails(permalink: string): ng.IPromise<any>;
    }

    class RouteResolverServices implements IRouteResolverServices {

        constructor(private $q: ng.IQService, private YoutubeServices: IYoutubeServices, private NewsServices: INewsServices){ }

        resolveVideosDetails(videoId: string):ng.IPromise<any> {
            return this.$q.all([
                this.YoutubeServices.getYouTubeVideoById(videoId)
            ]).then((results: any[]): any => {
                return {
                    video: results[0].data
                }
            });
        }
        
        resolveVideos(max: number):ng.IPromise<any> {
            return this.$q.all([
                this.YoutubeServices.getYouTubeVideos(max)
            ]).then((results: any[]): any => {
                return {
                    data: results[0]
                }
            });
        }
        
        resolveNews(max: number): ng.IPromise<any> {
            return this.$q.all([
                this.NewsServices.getNews(max)
            ]).then((results: any[]): any => {
                return {
                    data: results[0]
                }
            });
        }
        
        resolveNewsDetails(permalink: string): ng.IPromise<any> {
            return this.$q.all([
                this.NewsServices.getNewsByPermalink(permalink)
            ]).then((results: any[]): any => {
                return {
                    data: results[0]
                }
            });
        }
    }

    angular.module('services')
        .factory('RouteResolverServices',
            ['$q', 'YoutubeServices', 'NewsServices', ($q, YoutubeServices, NewsServices) => new RouteResolverServices($q, YoutubeServices, NewsServices)]);
}