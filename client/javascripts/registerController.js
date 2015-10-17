
//register controller
app.controller('registerCtrl', [ '$scope', '$http', '$location',  function ($scope, $http, $location) {
    $scope.submit = function () {
        console.log("registerCtrl");
        console.log('registerController submit:', $scope.form);
        $http.post('/register', $scope.form)
            .then(function (response) {
                console.log(response);
                $location.path("/index")
            });
    }
}]);
