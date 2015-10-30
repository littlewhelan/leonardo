//controllers for login
app.controller('loginCtrl', ['$scope', '$http', 'authService', '$location', '$rootScope', 'toastr', function($scope, $http, authService, $location, $rootScope, toastr){
    $scope.submit = function(){
        $http.post('/login', $scope.form)
            .then(function (response) {
                authService.saveToken(response.data);
                $rootScope.user = authService.getUser();
                $location.path("/search");
            },function(){
                toastr.error('incorrect username or password')
            }
        );
    };
}]);
