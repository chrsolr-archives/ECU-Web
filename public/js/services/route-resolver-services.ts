///<reference path="../../../typings/tsd.d.ts" />

module app.services {
    'use strict';

    export interface IRouteResolverService {

    }

    class RouteResolverServices implements IRouteResolverService {

        constructor(){

        }
    }

    angular.module('services').factory('RouteResolverServices', RouteResolverServices);
}