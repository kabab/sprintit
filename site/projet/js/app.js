'use strict';

var app = angular.module('appProjet', [
  'ngRoute',
  'appControllers',
  'appServices',
  'cgNotify',
  'ui.sortable',
  'ngTable'
]);

var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', []);

var options = {};
options.api_url = "http://localhost:3001";
options.site_url = "http://localhost/sprintit/site";

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/addproject', {
        templateUrl: 'templates/project.html',
        controller: 'ProjectsCtrl'
      }).
      when('/:id', {
        templateUrl: 'templates/sprints.html',
        controller: 'SprintCtrl'
      }).
      when('/:id/ressources', {
        templateUrl: 'templates/ressources.html',
        controller: 'RessourceCtrl'
      }).
      when('/:id/postits', {
        templateUrl: 'templates/postits.html',
        controller: 'PostItCtrl'
      }).
      when('/:id/todo', {
        templateUrl: 'templates/todo.html',
        controller: 'TodoCtrl'
      }).
      when('/:id/chat', {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl'
      }).
      when('/:id/issues', {
        templateUrl: 'templates/issues.html',
        controller: 'IssueCtrl'
      }).
      when('/:id/issues/:page', {
        templateUrl: 'templates/issues.html',
        controller: 'IssueCtrl'
      });
}]);

app.config(function ($httpProvider,$locationProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.filter('fromNow', function() {
  return function(text) {
    return moment(text).fromNow();
  }
});


app.filter('calendar', function() {
  return function(text) {
    return moment(text).calendar();
  }
});

app.filter('addMoment', function() {
  return function(text_date, dure) {
    return moment(text_date).add(dure, 'days').fromNow();
  }
});
