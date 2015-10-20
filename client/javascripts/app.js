
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


app.service('contactListData', function(){
    var includedEmails = [];
    var newContactList = [];
    var listNum = 0;


    return {
        newContactList: newContactList,
        listNum: listNum
    };
});


app.controller('newContactListController',['contactListData','$scope','$http', function(contactListData, $scope, $http) {
    //data to create a new contact list
    $scope.listname = {};


    //headers
    $scope.config = {
        headers: {'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9',

        'Content-Type': 'application/json'

        }
    };

    //function to creates the new contact list
    $scope.postList = function () {
        $scope.listReq = {"name": $scope.listname.input, "status": "ACTIVE"};
        console.log('posting list . . . ');
        console.log($scope.listReq);
        console.log($scope.config);
        $http.post('https://api.constantcontact.com/v2/lists?api_key=yg5p2qf549qacmbqayk5rn23', $scope.listReq, $scope.config).
            then(function (res) {
                console.log("res" + res);

                res.id = contactListData.listNum;

            });
    };

}]);


app.controller('contactListController',['contactListData','$scope','$http', function(contactListData, $scope, $http)
{


    var importDataArray = [];
    var listEnd = JSON.stringify("list: ["+ contactListData.listNum + "],column_names:[\"EMAIL\",\"FIRST NAME\", \"LAST NAME\", \"CITY\",\"COMPANY NAME\"]");

    //push the included/checked info to the email list
    $scope.contactChecked = function (id) {
        $scope.checked.push([id]);
    };


    //Post Data to Constant Contact
    $scope.sendPost = function() {
        var data = $.param({
            json: JSON.stringify({
                "importData": importDataArray + ", " + listEnd
            })
        });


        var config = {
            headers: {
                'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9'
            }
        };

        $http.post('https://api.constantcontact.com/v2/activities/addcontacts?api_key=u8w59ztxe3294adczfvn7k9e', data, config).
            success(function (data, status, headers, config) {
                res.id = contactListData.listNum;
            }).
            error(function (data, status, headers, config) {
                // log error
            });

   };
}])



