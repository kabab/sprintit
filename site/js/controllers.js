
appControllers.controller('RegisterCtrl', ['$scope','$location', 'UserService', 'notify',
    function RegisterCtrl($scope,$location, UserService, notify) {
      $scope.utilisateur = {};
      $scope.register = function() {
        UserService.register($scope.utilisateur).success(function(data) {
          if (!data.error) {
            $location.path('/');
          } else {
            angular.forEach(data.data, function(e) {
              notify({message: e, duration: 2000, classes: 'alert-danger'});
            });
          }
        });
      }
    }
  ]
);

appControllers.controller('LoginCtrl', ['$scope','$location','$window', 'UserService', 'AuthenticationService', 'notify',
    function LoginCtrl($scope, $location, $window, UserService, AuthenticationService, notify) {
      $scope.utilisateur = {};
      $scope.login = function() {
        UserService.login($scope.utilisateur).success(function(data) {
          if (!data.error) {
            AuthenticationService.isAuthenticated = true;
            $window.sessionStorage.token = data.data.token;
            $window.location.href = options.site_url + '/dashboard/';
          } else {
             angular.forEach(data.data, function(e) {
               notify({message: e, duration: 2000, classes: 'alert-danger'});
             });
           }
        });
      }
    }
  ]
);
