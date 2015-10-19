app.controller('navCtrl', ['authService','$scope','$rootScope','$location', function(authService, $scope, $rootScope, $location){
    $rootScope.user = authService.getUser();

    if($rootScope.user && $rootScope.user.username){
        $location.path('/home');
    }

    $scope.logout = function(){
        authService.logout();
        $rootScope.user = authService.getUser();
        $location.path("/");
    }
}]);
