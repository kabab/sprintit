'use strict';

var app = angular.module('appFront', [
  'ngRoute',
  'appControllers',
  'appServices',
  'cgNotify'
]);

var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', []);

var options = {};
options.api_url = "http://localhost:3001";
options.site_url = "http://localhost/sprintit/site";

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
