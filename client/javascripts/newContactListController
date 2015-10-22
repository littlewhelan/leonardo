// Ajax for creating the contact list in constant contact
app.controller('newContactListController',['NewContactListData','$scope','$http', function(newContactListData, $scope, $http) {
    //data to create a new contact list


    $scope.listname = {};

    $scope.createList  = function () {
        console.log("create list: " + scope.listname.input);
        //passes list name service
        NewContactListData.postList(scope.listname.input);

        $scope.listname={};
    };
}]);


