// Ajax for creating the contact list in constant contact

app.controller('newContactListController',['newContactListData','$scope','$http', function(newContactListData, $scope, $http) {

    //data to create a new contact list


    $scope.listName = {};

    $scope.createList  = function () {
        console.log("create list: " + $scope.listName.input);
        //passes list name service

        newContactListData.postList($scope.listName.input);


        $scope.listName={};
    };
}]);


