(function () {
    'use strict';
    Parse.initialize("Mw0dWtJQYVzYlA4vHybSNmuyLJSjzpEpTarhZMEQ", "gXEJhvTtHQcSNrryJ7u9IK4euVWOu00QEGnaK7ow");
    angular.module('services', []);
    angular.module('controllers', []);
    angular.module('filters', []);
    angular.module('directives', []);
    var modules = ['services', 'controllers', 'filters', 'directives', 'ngRoute', 'ui.bootstrap', 'angular-loading-bar', 'ngAnimate', 'ngTweets'];
    angular.module('app', modules);
})();
(function () {
    'use strict';
    angular.module('app').config(config);
    config.$inject = ['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', '$sceProvider'];
    function config($routeProvider, $locationProvider, cfpLoadingBarProvider, $sceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/home.html',
            caseInsensitiveMatch: true,
            controller: 'HomeController',
            controllerAs: 'vm'
        }).when('/news', {
            templateUrl: '/views/news.html',
            caseInsensitiveMatch: true,
            controller: 'NewsController',
            controllerAs: 'vm',
            resolve: {
                initData: ['$route', 'RouteResolverServices', function ($route, RouteResolverServices) {
                        return RouteResolverServices.resolveNews(50);
                    }]
            }
        }).when('/news/details/:permalink', {
            templateUrl: '/views/news-details.html',
            caseInsensitiveMatch: true,
            controller: 'NewsDetailsController',
            controllerAs: 'vm',
            resolve: {
                initData: ['$route', 'RouteResolverServices', function ($route, RouteResolverServices) {
                        return RouteResolverServices.resolveNewsDetails($route.current.params.permalink);
                    }]
            }
        }).when('/videos', {
            templateUrl: '/views/videos.html',
            caseInsensitiveMatch: true,
            controller: 'VideosController',
            controllerAs: 'vm',
            resolve: {
                initData: ['$route', 'RouteResolverServices', function ($route, RouteResolverServices) {
                        return RouteResolverServices.resolveVideos(50);
                    }]
            }
        }).when('/videos/details/:id', {
            templateUrl: '/views/videos-details.html',
            caseInsensitiveMatch: true,
            controller: 'VideosDetailsController',
            controllerAs: 'vm',
            resolve: {
                initData: ['$route', 'RouteResolverServices', function ($route, RouteResolverServices) {
                        return RouteResolverServices.resolveVideosDetails($route.current.params.id);
                    }]
            }
        }).when('/about', {
            templateUrl: '/views/about.html',
            caseInsensitiveMatch: true
        }).when('/policies', {
            templateUrl: '/views/policies.html',
            caseInsensitiveMatch: true
        }).when('/termsofuse', {
            templateUrl: '/views/terms-of-use.html',
            caseInsensitiveMatch: true
        }).otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
        cfpLoadingBarProvider.includeSpinner = false;
        $sceProvider.enabled(false);
    }
})();
(function () {
    'use strict';
    angular.module('app').run(run);
    run.$inject = ['$rootScope', 'NavigationServices'];
    function run($rootScope, NavigationServices) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            NavigationServices.closeSideBar();
        });
    }
})();
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var NavigationServices = (function () {
            function NavigationServices($rootScope) {
                this.$rootScope = $rootScope;
                this.isSideBarOpen = false;
            }
            NavigationServices.prototype.toggleSideBar = function () {
                this.isSideBarOpen = !this.isSideBarOpen;
                this.$rootScope.$broadcast('navigation:sidebar', this.isSideBarOpen);
            };
            NavigationServices.prototype.getSideBarState = function () {
                return this.isSideBarOpen;
            };
            NavigationServices.prototype.closeSideBar = function () {
                this.isSideBarOpen = false;
                this.$rootScope.$broadcast('navigation:sidebar', this.isSideBarOpen);
            };
            NavigationServices.prototype.openSideBar = function () {
                this.isSideBarOpen = true;
                this.$rootScope.$broadcast('navigation:sidebar', this.isSideBarOpen);
            };
            return NavigationServices;
        })();
        angular.module('services').factory('NavigationServices', ['$rootScope', function ($rootScope) { return new NavigationServices($rootScope); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        var GlobalServices = (function () {
            function GlobalServices($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            GlobalServices.prototype.getFeaturedVideo = function () {
                var q = this.$q.defer();
                if ((new Date().getUTCDay() === 1 && new Date().getUTCHours() >= 23) ||
                    (new Date().getUTCDay() === 2 && new Date().getUTCHours() <= 2)) {
                    q.resolve({
                        title: 'Live Stream',
                        url: 'http://www.ustream.tv/embed/10266764?v=3&amp;wmode=direct'
                    });
                }
                else {
                    var featuredVideo = Parse.Object.extend("FeaturedVideo");
                    var query = new Parse.Query(featuredVideo);
                    query.first({
                        success: function (object) {
                            q.resolve({
                                title: 'Video del Dia',
                                url: object.get('url')
                            });
                        },
                        error: function (error) {
                            q.reject("Error: " + error.code + " " + error.message);
                        }
                    });
                }
                return q.promise;
            };
            GlobalServices.prototype.subscribe = function (email) {
                var q = this.$q.defer();
                this.$http.post('/api/subscribe', { email: email })
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            GlobalServices.prototype.contactUs = function (contact) {
                var q = this.$q.defer();
                this.$http.post('/api/contactus', { contact: contact })
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            return GlobalServices;
        })();
        angular.module('services').factory('GlobalServices', ['$http', '$q', function ($http, $q) { return new GlobalServices($http, $q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var NewsServices = (function () {
            function NewsServices($q) {
                this.$q = $q;
            }
            NewsServices.prototype.getNews = function (max) {
                var q = this.$q.defer();
                var queryLimit = max || 50;
                var news = Parse.Object.extend("News");
                var query = new Parse.Query(news);
                query.descending('createdAt');
                query.limit(queryLimit);
                query.find({
                    success: function (objects) {
                        var data = [];
                        angular.forEach(objects, function (value, key) {
                            data.push(value.toJSON());
                        });
                        q.resolve(data);
                    },
                    error: function (error) {
                        q.reject("Error: " + error.code + " " + error.message);
                    }
                });
                return q.promise;
            };
            NewsServices.prototype.getNewsByPermalink = function (permalink) {
                var q = this.$q.defer();
                var news = Parse.Object.extend("News");
                var query = new Parse.Query(news);
                query.equalTo('permalink', permalink);
                query.first({
                    success: function (object) {
                        q.resolve(object.toJSON());
                    },
                    error: function (error) {
                        q.reject("Error: " + error.code + " " + error.message);
                    }
                });
                return q.promise;
            };
            return NewsServices;
        })();
        angular.module('services').factory('NewsServices', ['$q', function ($q) { return new NewsServices($q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var YoutubeServices = (function () {
            function YoutubeServices($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            YoutubeServices.prototype.getYouTubeVideos = function (max, page) {
                var q = this.$q.defer();
                max = max || 10;
                page = page || '';
                this.$http.get('/api/youtube?max=' + max + '&page=' + page)
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            YoutubeServices.prototype.getYouTubeVideoById = function (id) {
                var q = this.$q.defer();
                this.$http.get('/api/youtube/' + id)
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            return YoutubeServices;
        })();
        angular.module('services')
            .factory('YoutubeServices', ['$http', '$q', function ($http, $q) { return new YoutubeServices($http, $q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var SoundcloudServices = (function () {
            function SoundcloudServices($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            SoundcloudServices.prototype.getSoundcloudSongs = function () {
                var q = this.$q.defer();
                this.$http.get('/api/soundcloud')
                    .success(function (data) {
                    q.resolve(data);
                })
                    .error(function (error) {
                    q.reject(error);
                });
                return q.promise;
            };
            return SoundcloudServices;
        })();
        angular.module('services')
            .factory('SoundcloudServices', ['$http', '$q', function ($http, $q) { return new SoundcloudServices($http, $q); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var RouteResolverServices = (function () {
            function RouteResolverServices($q, YoutubeServices, NewsServices) {
                this.$q = $q;
                this.YoutubeServices = YoutubeServices;
                this.NewsServices = NewsServices;
            }
            RouteResolverServices.prototype.resolveVideosDetails = function (videoId) {
                return this.$q.all([
                    this.YoutubeServices.getYouTubeVideoById(videoId)
                ]).then(function (results) {
                    return {
                        video: results[0].data
                    };
                });
            };
            RouteResolverServices.prototype.resolveVideos = function (max) {
                return this.$q.all([
                    this.YoutubeServices.getYouTubeVideos(max)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            RouteResolverServices.prototype.resolveNews = function (max) {
                return this.$q.all([
                    this.NewsServices.getNews(max)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            RouteResolverServices.prototype.resolveNewsDetails = function (permalink) {
                return this.$q.all([
                    this.NewsServices.getNewsByPermalink(permalink)
                ]).then(function (results) {
                    return {
                        data: results[0]
                    };
                });
            };
            return RouteResolverServices;
        })();
        angular.module('services')
            .factory('RouteResolverServices', ['$q', 'YoutubeServices', 'NewsServices', function ($q, YoutubeServices, NewsServices) { return new RouteResolverServices($q, YoutubeServices, NewsServices); }]);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=app.js.map