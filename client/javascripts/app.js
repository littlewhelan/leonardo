var app = angular.module('leo', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'checklist-model', 'toastr', 'angular-momentjs']);


app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/static/login.html'
            }).
            when('/search', {
                templateUrl: '/private/search.html'
            }).
            when('/register', {
                templateUrl: '/static/register.html'
            }).
            when('/contactlist', {
                templateUrl: '/private/contactlist.html'
            }).
            when('/addfamily', {
                templateUrl: '/private/addfamily.html',
				controller: 'editFamilyCtrl'
            }).
            when('/addcorp', {
                templateUrl: '/private/addcorp.html',
				controller: 'editCorpCtrl'
            }).
            when('/contactlist', {
                templateUrl: 'private/contactlist.html'
            }).
            otherwise({
                redirectTo: '/search'
            });
    }]);




