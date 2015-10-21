// Ajax for creating the contact list in constant contact
app.controller('newContactListController',['contactListData','$scope','$http', function(contactListData, $scope, $http) {
    //data to create a new contact list


    $scope.listname = {};

    $scope.createList  = function () {
        console.log("create list: " + scope.listname.input);
        //passes list name service
        contactListData.postList(scope.listname.input);

        $scope.listname={};
    };
}]);


