
//This should get the search item
app.controller('searchFunction', ['$scope', '$http', 'ResultService', function ($scope, $http, ResultService) {
    $scope.formInput={};

    $scope.searchBtn = function () {
        //passes in search text to service
       ResultService.makeDataCall($scope.formInput.data);
        console.log('this is the input text', $scope.formInput);
        //empties the search box
        $scope.formInput={};
    };

}]);
