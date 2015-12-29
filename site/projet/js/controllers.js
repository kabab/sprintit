
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
        console.log($scope.sprint.taches);
        $scope.sprints[$scope.selected_sprint].active = false;
        $scope.sprints[i].active = true;
        $scope.selected_sprint = i;
      };

      $scope.add_task = function() {
        var sprint_id = $scope.sprints[$scope.selected_sprint]._id;
        SprintService.add_task(sprint_id).success(function(data) {
          $scope.sprints[$scope.selected_sprint].taches.push(data.data);
          $("#myModal2").modal('hide');
        });
      }

      $scope.add_sprint = function() {
        SprintService.add($routeParams.id, $scope.ntache).success(function(data) {
          $scope.sprints.push(data.data);
          var l = $scope.sprints.length;
          $scope.select_sprint(l - 1);
          $("#myModal").modal('hide')
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
