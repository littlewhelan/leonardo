var app = angular.module('leo', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

var prettyDate = "MM/DD/YYgYY";
var fullDate = "MM/DD/YYYY h:mm:ss a";

function formatDates (date) {
	return {
		full: moment(date).format(fullDate),
		pretty: moment(date).format(prettyDate)
	};
}

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
            when('/contactList', {
                templateUrl: 'private/contactList.html'
            }).
            when('/addfamily', {
                templateUrl: 'private/addfamily.html',
				controller: 'editFamilyCtrl'
            }).
            when('/addcorp', {
                templateUrl: 'private/addcorp.html',
				controller: 'editCorpCtrl'
            }).
            when('/contactlist', {
                templateUrl: 'private/contactlist.html'
            }).
            otherwise({
                redirectTo: '/search'
            });
    }]);




