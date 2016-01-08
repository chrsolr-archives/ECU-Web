///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    
    export interface IGlobalServices {
        getFeaturedVideo(): ng.IPromise<any>;
        subscribe(email: string): ng.IPromise<any>;
        contactUs(contact: string): ng.IPromise<any>;
    }
    
    class GlobalServices implements IGlobalServices {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {}
        
        getFeaturedVideo(): ng.IPromise<any>{
                var q = this.$q.defer();

                if ((new Date().getUTCDay() === 1 && new Date().getUTCHours() >= 23) ||
                    (new Date().getUTCDay() === 2 && new Date().getUTCHours() <= 2)) {
                    q.resolve({
                        title: 'Live Stream',
                        url: 'http://www.ustream.tv/embed/10266764?v=3&amp;wmode=direct'
                    });
                } else {
                    var featuredVideo = Parse.Object.extend("FeaturedVideo");
                    var query = new Parse.Query(featuredVideo);
                    query.first({
                        success: (object) => {
                            q.resolve({
                                title: 'Video del Dia',
                                url: object.get('url')
                            });
                        },
                        error: (error) => {
                            q.reject("Error: " + error.code + " " + error.message);
                        }
                    });
                }

                return q.promise;
            }
            
            subscribe(email: string): ng.IPromise<any> {
                var q = this.$q.defer();

                this.$http.post('/api/subscribe', {email: email})
                .success((data) => {
                    q.resolve(data);
                })
                .error((error) => {
                    q.reject(error);
                });

                return q.promise;
            }
            
            contactUs(contact: string): ng.IPromise<any> {
                var q = this.$q.defer();

                this.$http.post('/api/contactus', {contact: contact})
                    .success((data) => {
                        q.resolve(data);
                    })
                    .error((error) => {
                        q.reject(error);
                    });

                return q.promise;
            }
    }
    
    angular.module('services').factory('GlobalServices', ['$http', '$q', ($http, $q) => new GlobalServices($http, $q)]);
}