
var app = angular.module('leo', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'static/login.html'
            }).
            when('/search', {
                templateUrl: 'private/search.html'
            }).
            when('/register', {
                templateUrl: 'static/register.html'
            }).
            when('/tab2', {
                templateUrl: 'tab2.html'
            }).
            when('/tab1', {
                templateUrl: 'tab1.html'
            }).when('/tab3', {
                templateUrl: 'tab3.html'
            }).
            when('/tab4', {
                templateUrl: 'tab4.html'
            }).
            when('/add5', {
                templateUrl: 'add5.html'
            }).
            when('/add6', {
                templateUrl: 'add6.html'
            }).
            when('/add7', {
                templateUrl: 'add7.html'
            }).
            when('/add8', {
                templateUrl: 'add8.html'
            }).
            when('/addfamily', {
                templateUrl: 'private/addfamily.html'
            }).
            when('/addcorp', {
                templateUrl: 'private/addcorp.html'
            }).
            otherwise({
                redirectTo: '/search'
            });
    }]);

app.controller('loginCtrl', ['$scope', '$http', 'authService', '$location', '$rootScope', function($scope, $http, authService, $location, $rootScope){
    $scope.submit = function(){
        $http.post('/login', $scope.form)
            .then(function (response) {
                authService.saveToken(response.data);
                $rootScope.user = authService.getUser();
                $location.path("/search");
            });
    };
}]);
app.service('authService', ['$window', function ($window) {

    this.parseJwt = function (token) {
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        } else return {};
    };

    this.saveToken = function (token) {
        $window.localStorage.jwtToken = token;
        console.log('Saved token:',$window.localStorage.jwtToken);
    };

    this.getToken = function () {
        return $window.localStorage.jwtToken;
    };

    this.isAuthed = function () {
        var token = this.getToken();
        if (token) {
            var params = this.parseJwt(token);
            var notExpired = Math.round(new Date().getTime() / 1000) <= params.exp;
            if (!notExpired) {
                this.logout();
            }
            return notExpired;
        } else {
            return false;
        }
    };

    this.logout = function () {
        delete $window.localStorage.jwtToken;
    };

    // expose user as an object
    this.getUser = function () {
        return this.parseJwt(this.getToken())
    };
}]);

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
}]);

app.controller('registerCtrl', [ '$scope', '$http', '$location',  function ($scope, $http, $location) {
    $scope.submit = function () {
        console.log("registerCtrl");
        console.log('registerController submit:', $scope.form);
        $http.post('/register', $scope.form)
            .then(function (response) {
                console.log(response);
                $location.path("/index")
            });
    }
}]);
