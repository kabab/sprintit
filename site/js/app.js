'use strict';

var app = angular.module('appFront', [
  'ngRoute',
  'appControllers',
  'appServices',
]);

var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', []);

var options = {};
options.url = "http://localhost:3001";

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }).
      when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      });
}]);
/*
app.config(function ($httpProvider,$locationProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});
*/
