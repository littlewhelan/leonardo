// Ajax for creating the contact list in constant contact

app.controller('newContactListController',['newContactListData','$scope','$http', function(newContactListData, $scope) {

    //data to create a new contact list


    $scope.listname = {};

    $scope.createList  = function () {
        console.log("create list: " + $scope.listname.input);
        //passes list name service

        var promise = newContactListData.postList($scope.listname.input);

        promise.then(function (data) {
            console.log(data);
            listNum = toString(data.id);
            console.log("Id? ",data.id);

        });

        console.log("list #", $scope.listNum);
        console.log("list type", typeof $scope.listNum);

        $scope.listname={};
    };
}]);


