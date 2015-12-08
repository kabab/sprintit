
appControllers.controller('RegisterCtrl', ['$scope','$location', 'UserService',
    function RegisterCtrl($scope,$location, UserService) {
      $scope.utilisateur = {};
      $scope.register = function() {
        UserService.register($scope.utilisateur).success(function(data) {
          console.log(data);
        });
      }
    }
  ]
);
