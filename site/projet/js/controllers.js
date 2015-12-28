
appControllers.controller('SprintService', ['$scope','$location', '$window', 'ProjectService',
    function ($scope, $location, $window, ProjetService) {
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

appControllers.controller('MainCtrl', ['$scope','$location', '$window',
  function($scope,$location, $window) {
    $scope.logout = function() {
      if ($window.sessionStorage.token)
        delete $window.sessionStorage.token;
      $window.location.href = options.site_url;
    }
  }
]);
