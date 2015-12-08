
appControllers.controller('RegisterCtrl', ['$scope','$location', 'UserService',
    function RegisterCtrl($scope,$location, UserService) {
      $scope.utilisateur = {};
      $scope.register = function() {
        UserService.register($scope.utilisateur).success(function(data) {
          if (!data.error) {
            $location.path("register");
          } else {

          }
        });
      }
    }
  ]
);

appControllers.controller('LoginCtrl', ['$scope','$location','$window', 'UserService', 'AuthenticationService',
    function LoginCtrl($scope, $location, $window, UserService, AuthenticationService) {
      $scope.utilisateur = {};
      $scope.login = function() {
        UserService.login($scope.utilisateur).success(function(data) {
          console.log(data);
          AuthenticationService.isAuthenticated = true;
          $window.sessionStorage.token = data.data.token;
          $window.location.href = options.site_url + '/dashboard/';
        });
      }
    }
  ]
);
