// Ajax for creating the contact list in constant contact
app.controller('newContactListController',['newContactListData','$scope', '$rootScope', function(newContactListData, $scope, $rootScope) {
    //data to create a new contact list

    $scope.hide = function(){
        console.log('hide');
        $rootScope.hide = true;
    };

    $scope.listname = {};

    $scope.createList  = function () {
        console.log("create list: " + $scope.listname.input);
        //passes list name service
        newContactListData.postList($scope.listname.input);

        console.log('list #',newContactListData.listNum);

        $scope.listname={};
    };
}]);


