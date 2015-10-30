// Ajax for creating the contact list in constant contact
app.controller('newContactListController',['newContactListData','$scope', '$rootScope', 'toastr', function(newContactListData, $scope, $rootScope, toastr) {
    //data to create a new contact list

    $scope.hide = function(){
        console.log('hide');
        $rootScope.hide = true;
    };

    $scope.listname = {};

    $scope.createList  = function () {
        console.log("create list: " + $scope.listname.input);
        //passes list name service
        newContactListData.postList($scope.listname.input, function (status) {
			if(status === true) {
				//console.log('list #',newContactListData.listNum);
				$scope.listname={};
				toastr.success('Successfully created list');
				$scope.hide();
			}else {
				console.log("failed to create list");
				toastr.error('Failed to create list');
			}
		});


    };
}]);


