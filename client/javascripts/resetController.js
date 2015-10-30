app.controller('resetCtrl', [ '$scope', '$http', '$location', 'authService', 'toastr', function ($scope, $http, $location, authService, toastr) {
    $scope.submit = function () {
        console.log('edit password:', $scope.form);
		var tempUser = authService.getUser();
		console.log("auth user", tempUser);
		// add in id, username
		var user = $scope.form;
		user.id = tempUser.id;
		user.username = tempUser.username;
		console.log("prepared", user);
        $http.put('/admin', user)
            .then(function (response) {
                console.log(response);
                toastr.success('password changed');
                $location.path("/index");
            },function(){
            toastr.error('failed to update password');
            }
        );
    }
}]);
