'use strict';

var app = angular.module('appProjet', [
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
      when('/:id', {
        templateUrl: 'templates/sprints.html',
        controller: 'SprintCtrl'
      }).
      when('/:id/ressources', {
        templateUrl: 'templates/ressources.html',
        controller: 'RessourceCtrl'
      }).
      when('/addproject', {
        templateUrl: 'templates/project.html',
        controller: 'ProjectsCtrl'
      });
}]);

app.config(function ($httpProvider,$locationProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});
