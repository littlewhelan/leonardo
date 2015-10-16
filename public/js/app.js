
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

//app.controller('resetCtrl', [ '$scope', '$http', '$location',  function ($scope, $http, $location) {
//    $scope.submit = function () {
//        console.log('edit password:', $scope.form);
//        $http.put('/admin', $scope.form)
//            .then(function (response) {
//                console.log(response);
//                $location.path("/index")
//            });
//    }
//}]);




//This service should pass data between controllers
app.factory('ResultService', function($http) {
    var results = [];
    var adults = [];
    var companies = [];
    var kids = [];

    var makeDataCall = function(passedData) {
        return $http({
            method: 'GET',
            url: '../search',
            params:{search:passedData}
        }).then(function (response) {
            console.log('this should be the response data', response.data);
            results = response.data;
            getCompanies(results);
            getKids(results);
            getAdults(results);
        });
    };

    var getCompanies = function(array) {
        var getElement1 = function(array) {
            array.forEach(function(element){
                if (element.type == 'company')
                    companies.push(element);
            })
        };

        getElement1(array);
        console.log('this is getElement1',companies);
        return companies
    };

    var getAdults = function(array) {
        var getElement2 = function(array) {
            array.forEach(function(element){
                if (element.type == 'adult')
                    adults.push(element);
            })
        };
        getElement2(array);
        console.log('this is in getElement2', adults);
        return adults
    };

    var getKids = function(array) {
        var getElement3 = function(array) {
            array.forEach(function(element){
                if (element.type == 'child')
                    kids.push(element);
            })
        };
        getElement3(array);
        console.log('this is getElements3', kids);
        return kids
    };

    //public
    var publicApi = {
        getKids: getKids,
        getAdults: getAdults,
        getCompanies: getCompanies,
        makeDataCall: makeDataCall,
        results: results,
        companies: companies,
        adults: adults,
        kids: kids
    };
    return publicApi;
});

//This should get the search item
app.controller('searchFunction', ['$scope', '$http', 'ResultService', function ($scope, $http, ResultService) {
    $scope.formInput={};

    $scope.searchBtn = function () {
        ResultService.kids =[];
        ResultService.adults =[];
        ResultService.companies =[];
        //passes in search text to service
       ResultService.makeDataCall($scope.formInput.data);
        console.log('this is the input text', $scope.formInput);
        //emptys the search box
        $scope.formInput={};
    };

}]);

//edit corporation modal template
app.controller('editCorpCtrl', ['$scope', '$uibModal', '$log', 'ResultService', function ($scope, $uibModal, $log, ResultService) {
    //sends the companies after the results have been organized
    $scope.companies = ResultService.companies;

    $scope.animationsEnabled = true;

    $scope.openCorp = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'private/editcorp.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);

//edit family modal template
app.controller('editFamilyCtrl',['$scope', '$uibModal', '$log','ResultService', function ($scope, $uibModal, $log, ResultService) {
    //sends the adults after the results have been organized
    $scope.adults = ResultService.adults;
    //sends the kids after the results have been organized
    $scope.kids = ResultService.kids;


    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'private/editfamily.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

//needed for modal?? pretty sure
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

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


//controllers for login
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
        //console.log('Saved token:',$window.localStorage.jwtToken);
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

//register controller
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


app.controller('navCtrl', ['authService','$scope','$rootScope','$location', function(authService, $scope,$rootScope, $location){
    $rootScope.user = authService.getUser();

    if($rootScope.user && $rootScope.user.username){
        $location.path('/home');
    }

    $scope.logout = function(){
        authService.logout();
        $rootScope.user = authService.getUser();
        $location.path("/");
    }
}]);

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

app.service('contactListData', function(){
var includedEmails = [];
var newContactList = [];
var listNum = 0;


    return {
        newContactList: newContactList,
        listNum: listNum
    };
});

app.controller('newContactListController', function(contactListData, $scope, $http) {
    //data to create a new contact list
    $scope.listReq = {"Name": $scope.form, "Status": "ACTIVE"};
    //headers
    $scope.config = {headers: {"Authorization": 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9'}};

    //function to creats the new contact list
    $scope.postList = function () {
        console.log('posting list . . . ');

        $http.post('https://api.constantcontact.com/v2/lists?api_key=u8w59ztxe3294adczfvn7k9e', listReq, config).
            then(function (res) {
                console.log("res" + res);

                res.id = listNum;

            }).
            error(function (data, status, headers, config) {
                // log error
            });

    };

});

//app.controller('contactListController', function(contactListData, $scope, $http)
//{
//    var importDataArray = [];
//    var listEnd = JSON.stringify("list: ["+ listNum + "],column_names:[\"EMAIL\",\"FIRST NAME\", \"LAST NAME\", \"CITY\",\"COMPANY NAME\"]");
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
//                res.id = listNum;
//            }).
//            error(function (data, status, headers, config) {
//                // log error
//            });
//    };
//});
//
