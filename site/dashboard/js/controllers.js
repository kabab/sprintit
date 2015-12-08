
appControllers.controller('ProjectsCtrl', ['$scope','$location', 'ProjectService',
    function ($scope,$location, ProjetService) {
      $scope.projets = {}

      ProjetService.find().success(function(data) {
        $scope.projets = data.data;
      });

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
