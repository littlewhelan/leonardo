
//register controller
app.controller('registerCtrl', [ '$scope', '$http', '$location', 'toastr',  function ($scope, $http, $location, toastr) {
    $scope.submit = function () {
        console.log("registerCtrl");
        console.log('registerController submit:', $scope.form, $scope.form.username);
        $http.post('/register', $scope.form)
            .then(function (response) {
                console.log(response);
                $location.path("/index");
                toastr.success("admin created");
            },function(){
             toastr.error('failed to add admin');
            }
        );
    }
}]);
