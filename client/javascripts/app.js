
var app = angular.module('leo', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

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
                templateUrl: 'private/addfamily.html'
            }).
            when('/addcorp', {
                templateUrl: 'private/addcorp.html'
            }).
            when('/contactlist', {
                templateUrl: 'private/contactlist.html'
            }).
            otherwise({
                redirectTo: '/search'
            });
    }]);







//.controller('newContactListController',['contactListData','$rootScope','$scope','$http', function(contactListData,$rootScope, $scope, $http) {
// //data to create a new contact list
// $scope.listname = {};
//
// $scope.hide = function(){
//     $rootScope.add = true;
// };
//
// //headers
// $scope.config = {
//     headers: {'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9',
//
//     'Content-Type': 'application/json'
//
//     }
// };







//app.controller('contactListController',['contactListData','$scope','$http', function(contactListData, $scope, $http) {
//
//
//
//  var importDataArray = [];
//  var listEnd = JSON.stringify("list: ["+ contactListData.listNum + "],column_names:[\"EMAIL\",\"FIRST NAME\", \"LAST NAME\", \"CITY\",\"COMPANY NAME\"]");
//
//  //push the included/checked info to the email list
//  $scope.contactChecked = function (id) {
//      $scope.checked.push([id]);
//  };
//
//
//  //Post Data to Constant Contact
//  $scope.sendPost = function() {
//      var data = $.param({
//          json: JSON.stringify({
//              "importData": importDataArray + ", " + listEnd
//          })
//      });
//
//
//      var config = {
//          headers: {
//              'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9'
//          }
//      };
//
//      $http.post('https://api.constantcontact.com/v2/activities/addcontacts?api_key=u8w59ztxe3294adczfvn7k9e', data, config).
//          success(function (data, status, headers, config) {
//              res.id = contactListData.listNum;
//          }).
//          error(function (data, status, headers, config) {
//              // log error
//          });
//
// };
}]);



