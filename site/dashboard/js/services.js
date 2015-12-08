appServices.factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    }
    return auth;
});

appServices.factory('TokenInterceptor', function ($q, $window, $location,AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                $window.location.href = options.site_url + '/#/login';
            }

            return $q.reject(rejection);
        }
    };
});

appServices.factory('ProjectService', function ($http,$q,$timeout) {
    return {
        add: function(p) {
            return $http.post(options.api_url + '/projets/', p);
        },
        edit: function() {
            return $http.get(options.api_url + '/users/logout');
        },
        find: function() {
            return $http.get(options.api_url + '/projets/');
        }
    }
});
