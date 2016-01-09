///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    'use strict';

    export interface INewsServices {
        getNews(max: number): ng.IPromise<any>;
        getNewsByPermalink(permalink: string): ng.IPromise<any>;
    }

    class NewsServices implements INewsServices {
        constructor(private $q: ng.IQService) {}
        
        getNews(max: number): ng.IPromise<any>{
            var q = this.$q.defer();

            var queryLimit = max || 50;

            var news = Parse.Object.extend("News");
            var query = new Parse.Query(news);
            query.descending('createdAt');

            query.limit(queryLimit);

            query.find({
                success: (objects) => {
                    var data = [];

                    angular.forEach(objects, (value, key) => {
                        data.push(value.toJSON());
                    });

                    q.resolve(data);
                },
                error: (error) => {
                    q.reject("Error: " + error.code + " " + error.message);
                }
            });

            return q.promise;
        }
        
        getNewsByPermalink(permalink: string): ng.IPromise<any>{
            var q = this.$q.defer();

            var news = Parse.Object.extend("News");
            var query = new Parse.Query(news);
            query.equalTo('permalink', permalink);
            query.first({
                success: (object) => {
                    q.resolve(object.toJSON());
                },
                error: (error) => {
                    q.reject("Error: " + error.code + " " + error.message);
                }
            });

            return q.promise;
        }
    }

    angular.module('services').factory('NewsServices', ['$q', ($q) => new NewsServices($q)]);
}