// Ajax for creating the contact list in constant contact
app.controller('newContactListController',['newContactListData','$scope', function(newContactListData, $scope) {
    //data to create a new contact list


    $scope.listname = {};

    $scope.createList  = function () {
        console.log("create list: " + $scope.listname.input);
        //passes list name service
        newContactListData.postList($scope.listname.input);

        console.log('list #',newContactListData.listNum);

        $scope.listname={};
    };
}]);


