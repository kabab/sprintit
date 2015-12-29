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
            if (rejection != null && rejection.status === 401) {
                if ($window.sessionStorage.token)
                  delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                $window.location.href = options.site_url + '/';
            }

            return $q.reject(rejection);
        }
    };
});

appServices.factory('SprintService', function ($http,$q,$timeout) {
    return {
        add: function(projet_id, s) {
            return $http.post(options.api_url + '/sprints/projets/' + projet_id, s);
        },
        find: function(projet_id) {
            return $http.get(options.api_url + '/sprints/projets/'  + projet_id);
        },
        add_task: function(sprint_id, t) {
            return $http.get(options.api_url + '/taches/sprints/' + sprint_id , t);
        }
    }
});
