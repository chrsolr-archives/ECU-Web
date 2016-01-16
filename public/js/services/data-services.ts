///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    'use strict';

    export interface IDataServices {
        getPromos(): ng.IPromise<any>;
        getNews(max: number): ng.IPromise<any>;
        getNewsByPermalink(permalink: string): ng.IPromise<any>;
    }

    class DataServices implements IDataServices {

        static $inject = ['$http', '$q'];

        constructor(private $http:ng.IHttpService, private $q:ng.IQService) {

        }

        getPromos():ng.IPromise<any> {
            var q = this.$q.defer();

            var Promo = Parse.Object.extend("Promo");
            var query = new Parse.Query(Promo);

            query.descending('createdAt');
            query.equalTo('isActive', true);
            query.limit(10);

            query.find({
                success: (objects) => {
                    var data = [];

                    for (let i = 0; i < objects.length; i++) {
                        if (i%2 === 0) {
                            var content = { content: [] };
                            content.content.push(objects[i].toJSON());
                            content.content.push(objects[i+1].toJSON());
                            data.push(content);
                        }
                    }

                    q.resolve(data);
                },
                error: (error) => {
                    q.reject("Error: " + error.code + " " + error.message);
                }
            });

            return q.promise;
        }

        getNews(max: number): ng.IPromise<any>{
            var q = this.$q.defer();

            var queryLimit = max || 50;

            var news = Parse.Object.extend("News");
            var query = new Parse.Query(news);
            query.descending('createdAt');
            query.equalTo('isActive', true);

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

    angular.module('services')
        .service('DataServices', DataServices);
}