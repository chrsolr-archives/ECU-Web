///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    'use strict';

    export interface IYoutubeServices {
        getYouTubeVideos(max: number, page: string): ng.IPromise;
        getYouTubeVideoById(id: string): ng.IPromise;
    }

    class YoutubeServices implements IYoutubeServices {

        constructor(private $http: ng.IHttpProvider, private $q: ng.IQService){

        }

        getYouTubeVideos(max:number, page:string):ng.IPromise {
            var q = this.$q.defer();

            max = max || 10;
            page = page || '';

            this.$http.get('/api/youtube?max=' + max + '&page=' + page)
                .success(function(data){
                    q.resolve(data);
                })
                .error(function(error){
                    q.reject(error);
                });

            return q.promise;
        }

        getYouTubeVideoById(id:string):ng.IPromise {
            var q = this.$q.defer();

            this.$http.get('/api/youtube/' + id)
                .success(function(data){
                    q.resolve(data);
                })
                .error(function(error){
                    q.reject(error);
                });

            return q.promise;
        }
    }

    angular.module('services')
        .factory('YoutubeServices', ['$http', '$q', ($http, $q) => new YoutubeServices($http, $q)]);
}