
//register controller
app.controller('registerCtrl', [ '$scope', '$http', '$location', 'toastr', 'validService',  function ($scope, $http, $location, toastr, validService) {
	// sets validation from service for dom calls
	$scope.validateInput = validService.validateInput;
    $scope.submit = function () {
        //console.log("registerCtrl");
        //console.log('registerController submit:', $scope.form, $scope.form.username);
        $http.post('/register', $scope.form)
            .then(function (response) {
                //console.log(response);
                $location.path("/index");
                toastr.success("admin created");
            },function(){
             toastr.error('failed to add admin');
            }
        );
    }
}]);
