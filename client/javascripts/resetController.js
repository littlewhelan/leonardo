app.controller('resetCtrl', [ '$scope', '$http', '$location',  function ($scope, $http, $location) {
    $scope.submit = function () {
        console.log('edit password:', $scope.form);
        $http.put('/admin', $scope.form)
            .then(function (response) {
                console.log(response);
                $location.path("/index")
            });
    }
}]);
