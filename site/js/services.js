
appServices.factory('UserService', function ($http,$q,$timeout) {
    return {
        signIn: function(user) {
            var def = $q.defer();
            $http.post(options.api.base_url + '/users/signin', user).success(function (data, status, headers, config) {
                $timeout(function () {
                    def.resolve(data);
                });
            }).error(function (data, status, headers, config) {
                def.reject('error');
            });
            return def.promise;
        },
        logOut: function() {
            return $http.get(options.api.base_url + '/users/logout');
        },
        register: function(u) {
            return $http.post(options.url + '/utilisateurs/', u);
        }
    }
});
