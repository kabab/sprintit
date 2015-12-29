
appControllers.controller('SprintCtrl', ['$scope','$location', '$window', 'SprintService', '$routeParams', '$route',
    function ($scope, $location, $window, SprintService, $routeParams, $route) {
      $scope.sprints = {};
      $scope.nsprint = {};
      $scope.sprint = {};

      $scope.projet_id = $routeParams.id;

      $scope.selected_sprint = -1;

      SprintService.find($routeParams.id).success(function(data) {
        $scope.sprints = data.data;
        var l = $scope.sprints.length;
        $scope.sprint = $scope.sprints[l - 1];
        $scope.selected_sprint = l - 1;
        $scope.sprints[l - 1].active = true;
      });

      $scope.select_sprint = function(i) {
        $scope.sprint = $scope.sprints[i];
        $scope.sprints[$scope.selected_sprint].active = false;
        $scope.sprints[i].active = true;
        $scope.selected_sprint = i;
      };

      $scope.add_sprint = function() {
        SprintService.add($routeParams.id, $scope.nsprint).success(function(data) {
          window.location.reload();
        });

      }
    }
  ]
);

appControllers.controller('MainCtrl', ['$scope','$location', '$window',
  function($scope,$location, $window) {
    $scope.logout = function() {
      if ($window.sessionStorage.token)
        delete $window.sessionStorage.token;
      $window.location.href = options.site_url;
    }
  }
]);
