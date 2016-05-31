var app = angular.module('leo', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'checklist-model', 'toastr', 'angular-momentjs']);


app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'leo/static/login.html'
            }).
            when('/search', {
                templateUrl: 'leo/private/search.html'
            }).
            when('/register', {
                templateUrl: 'leo/static/register.html'
            }).
            when('/contactList', {
                templateUrl: 'leo/private/contactlist.html'
            }).
            when('/addfamily', {
                templateUrl: 'leo/private/addfamily.html',
				controller: 'editFamilyCtrl'
            }).
            when('/addcorp', {
                templateUrl: 'leo/private/addcorp.html',
				controller: 'editCorpCtrl'
            }).
            when('/contactlist', {
                templateUrl: 'leo/private/contactlist.html'
            }).
            otherwise({
                redirectTo: '/search'
            });
    }]);




