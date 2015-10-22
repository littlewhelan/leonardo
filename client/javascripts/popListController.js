app.controller('popListController',['newContactListData','$scope','$http', function(newContactListData, $scope, $http) {
    //data to create a new contact list


    $scope.listName = {};

    $scope.populateList  = function () {
        console.log("create list: " + scope.listName.input);
        //passes in search text to service
        newContactListData.popList();
        //var listEnd = {
        //    "lists": [listNum],
        //    "column_names": [
        //    "EMAIL",
        //    "FIRST NAME",
        //    "LAST NAME",
        //    "CITY",
        //    "COMPANY NAME"
        //]}


        $scope.listName={};
    };
}]);

