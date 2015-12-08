
appControllers.controller('ProjectsCtrl', ['$scope','$location', 'ProjectService',
    function ($scope,$location, ProjetService) {
      $scope.projet = {};
      $scope.add = function() {
        ProjetService.add($scope.projet).success(function(data) {
          if (!data.error) {
            $location.path("/");
          }
        });
      }
    }
  ]
);
