app.controller('popListController',['contactListData','$scope','$http', function(contactListData, $scope, $http) {
    //data to create a new contact list


    $scope.listname = {};

    $scope.populateList  = function () {
        console.log("create list: " + scope.listname.input);
        //passes in search text to service
        contactListData.popList();
        //var listEnd = {
        //    "lists": [listNum],
        //    "column_names": [
        //    "EMAIL",
        //    "FIRST NAME",
        //    "LAST NAME",
        //    "CITY",
        //    "COMPANY NAME"
        //]}


        $scope.listname={};
    };
}]);

