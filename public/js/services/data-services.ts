///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    'use strict';

    export interface IDataServices {
        news: any[];
        getPromos(): ng.IPromise<any>;
        getNews(max?: number): ng.IPromise<any>;
        getNewsByPermalink(permalink: string): ng.IPromise<any>;
    }

    class DataServices implements IDataServices {
        news: any[];

        static $inject = ['$http', '$q'];

        constructor(private $http:ng.IHttpService, private $q:ng.IQService) {
            this.news = [];
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

        getNews(max?: number): ng.IPromise<any>{

            var _this = this; 
            var q = _this.$q.defer();
            
            if (_this.news.length === 0) {
                var queryLimit = max || 50;

                var news = new Parse.Object("News");
                var query = new Parse.Query(news)
                
                query.descending('createdAt');
                query.equalTo('isActive', true);
                query.limit(queryLimit);
    
                query.find().then((objects) => {
                        var data = [];
    
                        angular.forEach(objects, (value, key) => {
                            data.push(value.toJSON());
                        });
                        
                        _this.news = data;
                        
                        q.resolve(_this.news);
                    },(error) => {
                        q.reject("Error: " + error.code + " " + error.message);
                    });
                    
                    return q.promise;
            }

            q.resolve(_this.news);

            return q.promise;
        }

        getNewsByPermalink(permalink: string): ng.IPromise<any>{
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
            for (var i in _this.news){
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