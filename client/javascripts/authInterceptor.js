app.factory('authInterceptor', ['$q', '$location', 'authService', function ($q, $location, authService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (authService.isAuthed()) {
                config.headers.Authorization = 'Bearer ' + authService.getToken();
            }
            return config;
        },
        response: function (response) {

            if (response.status === 401) {

                // handle the case where the user is not authenticated
                $location.path("/");
            }
            return response || $q.when(response);
        }, responseError: function (response) {
            if (response.status === 401) {

                // handle the case where the user is not authenticated
                $location.path("/");

            } else {
                console.log(response.status);
            }
            return $q.reject(response);
        }
    };
}])