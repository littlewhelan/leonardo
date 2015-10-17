
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












//dummy data edit family additional members
//app.controller('additionalCtrl', [ '$scope', function($scope){
//    $scope.additional = {
//        fName: 'Greg',
//        lName: 'Brady',
//        //bDay: '1983-03-05',
//        notes: 'This area is reserved for information as needed'
//    };
//    $scope.set = function(edit_info) {
//        this.contact.fName = edit_info,
//        this.contact.lName = edit_info,
//        this.contact.bDay = edit_info,
//        this.contact.notes = edit_info
//    };
//}]);

//dummy data for family contact information
//app.controller('contactCtrl', ['$scope', function($scope){
    //$scope.contact = {
    //    fName: 'Mike',
    //    lName: 'Brady',
    //    address1: '4222 Clinton Way',
    //    address2: '4222 Clinton Way',
    //    zip: '55555',
    //    city: 'Los Angeles',
    //    state: 'CA',
    //    phone: '555-555-5555',
    //    cell: '555-555-5555',
    //    email: 'mike@gmail.com',
    //    company: '3m',
    //    notes: 'This area is reserved for information as needed',
    //    yfName: 'Carol',
    //    ylName: 'Brady',
    //    yaddress1: '4222 Clinton Way',
    //    yaddress2: '4222 Clinton Way',
    //    yzip: '55555',
    //    ycity: 'Los Angeles',
    //    ystate: 'CA',
    //    yphone: '555-555-5555',
    //    ycell: '555-555-5555',
    //    yemail: 'carol@gmail.com',
    //    ycompany: '3m',
    //    ynotes: 'This are is reserved for information as needed'
    //};
    //$scope.set = function(edit_info) {
    //    this.contact.fName = edit_info,
    //    this.contact.lName = edit_info,
    //    this.contact.address1 = edit_info,
    //    this.contact.address2 = edit_info,
    //    this.contact.zip = edit_info,
    //    this.contact.city = edit_info,
    //    this.contact.state = edit_info,
    //    this.contact.phone = edit_info,
    //    this.contact.email = edit_info,
    //    this.contact.company = edit_info,
    //    this.contact.notes = edit_info,
    //    this.contact.yfName = edit_info,
    //    this.contact.ylName = edit_info,
    //    this.contact.yaddress1 = edit_info,
    //    this.contact.yaddress2 = edit_info,
    //    this.contact.yzip = edit_info,
    //    this.contact.ycity = edit_info,
    //    this.contact.ystate = edit_info,
    //    this.contact.yphone = edit_info,
    //    this.contact.ycompany = edit_info,
    //    this.contact.ynotes = edit_info
    //};

//}]);

//dummy data for family emergency contact information
//app.controller('emergencyCtrl',['$scope', function($scope){
    //$scope.emergency = {
    //                    fName: 'Mike',
    //                    lName: 'Brady',
    //                    address1: '4222 Clinton Way',
    //                    address2: '4222 Clinton Way',
    //                    zip: '55555',
    //                    city: 'Los Angeles',
    //                    state: 'CA',
    //                    phone: '555-555-5555',
    //                    notes: 'This are is reserved for information as needed'
    //                    };
    //$scope.set = function(edit_info) {
    //    this.emergency.fName = edit_info,
    //    this.emergency.lName = edit_info,
    //    this.emergency.address1 = edit_info,
    //    this.emergency.address2 = edit_info,
    //    this.emergency.zip = edit_info,
    //    this.emergency.city = edit_info,
    //    this.emergency.state = edit_info,
    //    this.emergency.phone = edit_info,
    //    this.emergency.notes = edit_info
    //
    //};
//}]);







////service for sharing search data across controllers
//app.service('searchSharedData', function () {
//    var results = {
//        //search results
//    };
//    return results;
//});
//
////controller for handling the search results
//app.controller('SearchResultController', function('SharedDataService',$scope, $http)
//{
//
//})




//app.controller('newContactListController', function(contactListData, $scope, $http) {
//    //data to create a new contact list
//    $scope.listname = {};
//
//
//    //headers
//    $scope.config = {
//        headers: {'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9',
//        'Content-Type': 'application/json',
//        }
//    };
//
//    //function to creats the new contact list
//    $scope.postList = function () {
//        $scope.listReq = {"name": $scope.listname.input, "status": "ACTIVE"};
//        console.log('posting list . . . ');
//        console.log($scope.listReq);
//        console.log($scope.config);
//        $http.post('https://api.constantcontact.com/v2/lists?api_key=yg5p2qf549qacmbqayk5rn23', $scope.listReq, $scope.config).
//            then(function (res) {
//                console.log("res" + res);
//
//                res.id = contactListData.listNum;
//
//            });
//            //error(function (data, status, headers, config) {
//            //    // log error
//            //});
//
//    };
//
//});
//
//app.controller('contactListController', function(contactListData, $scope, $http)
//{
//    var importDataArray = [];
//    var listEnd = JSON.stringify("list: ["+ contactListData.listNum + "],column_names:[\"EMAIL\",\"FIRST NAME\", \"LAST NAME\", \"CITY\",\"COMPANY NAME\"]");
//
//    //push the included/checked info to the email list
//    $scope.contactChecked = function (id) {
//        $scope.checked.push([id]);
//    };
//
//
//    //Post Data to Constant Contact
//    $scope.sendPost = function() {
//        var data = $.param({
//            json: JSON.stringify({
//                "importData": importDataArray + ", " + listEnd
//            })
//        });
//
//
//        var config = {
//            headers: {
//                'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9'
//            }
//        };
//
//        $http.post('https://api.constantcontact.com/v2/activities/addcontacts?api_key=u8w59ztxe3294adczfvn7k9e', data, config).
//            success(function (data, status, headers, config) {
//                res.id = contactListData.listNum;
//            }).
//            error(function (data, status, headers, config) {
//                // log error
//            });
//    };
//});

