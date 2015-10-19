//service for ajax calls to constant contact

app.service('contactListData', ['$scope','$http', function($scope, $http) {
    var includedEmails = [];
    var newContactList = [];
    var listNum = 0;


    $scope.postList = function () {
        $http.post('/newContactList').success(function(data, status, headers, config){
            console.log(data);
        });
        console.log(options)
    };
    ////headers
    //$scope.config = {
    //    headers: {'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9',
    //        'Content-Type': 'application/json',
    //    }
    //};
    //
    ////function to creats the new contact list
    //$scope.postList = function () {
    //    $scope.listReq = {"name": $scope.listname.input, "status": "ACTIVE"};
    //    console.log('posting list . . . ');
    //    console.log($scope.listReq);
    //    console.log($scope.config);
    //    $http.post('https://api.constantcontact.com/v2/lists?api_key=yg5p2qf549qacmbqayk5rn23', $scope.listReq, $scope.config).
    //        then(function (res) {
    //            console.log("res" + res);
    //
    //            res.id = contactListData.listNum;
    //
    //        });
    //    //error(function (data, status, headers, config) {
    //    //    // log error
    //    //});
    //
    //};


    return {
        newContactList: newContactList,
        listNum: listNum
    };
}]);