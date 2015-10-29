app.controller('createListSearch', ['$scope', '$http', 'ContactListDataService', 'newContactListData', 'toastr', '$rootScope', function ($scope, $http, ContactListDataService,newContactListData, toastr, $rootScope) {
    $scope.type ={};
    $scope.age={};
    $scope.zip={};
	// include list needs to be within an object due to the checkboxes being in a table
	$scope.emails = {};
    $scope.emails.includedEmails = [];
	$scope.includedEmails = [];
	$scope.totalDisplayed = 50;
	$scope.totalResults = 0;
    //$rootScope.hide = true;



    $scope.emailList = [ ];
    $scope.searchListBtn = function () {
		$scope.emailList = [];


        //THIS WORKS  -- will search by zip
        if ($scope.type == 'zipCk') {

            ContactListDataService.makeDataCall('zip', $scope.zip.data)
                .then(function (data) {
                    $scope.emailList = data;
					$scope.totalResults = data.length;
                    console.log($scope.emailList);
					toastr.success('Loaded '+ $scope.totalResults +' results');
                }).catch(function () {
					toastr.error('Failed to load results');
				});
        }


        //THIS WORKS - will search by age
        if ($scope.type == 'ageCk') {
            var age = ContactListDataService.makeDataCall('age', $scope.age.data);
            age.then(function (data) {
                console.log(data);
                $scope.emailList = data;
				$scope.totalResults = data.length;
            });
        }

        //THIS WORKS --get all families if fam is true
        if ($scope.type == 'fam') {
            var fam = ContactListDataService.makeDataCall('family', '');
            fam.then(function (data) {
                $scope.emailList = data;
				$scope.totalResults = data.length;
                console.log(data);
            });
        }

        //get all corp if corp is true
        if ($scope.type == 'corp') {
            var comp = ContactListDataService.makeDataCall('company', '');
            comp.then(function (data) {
                $scope.emailList = data;
				$scope.totalResults = data.length;
                console.log(data);
            });
        }

        //empty the search box
       $scope.type={};
        $scope.age={};
        $scope.zip={};

    };
    $scope.populateList  = function () {
        //alert('working');
        console.log($scope.emails.includedEmails);
        newContactListData.popList($scope.emails.includedEmails);
            //.then(function() {
            //    $(".search").hide();
            //    $(".endMessage").append("<h2>sent</h2>");
            //});
  };

	$scope.loadMore = function () {
		$scope.totalDisplayed += 50;
	};

	$scope.showAll = function () {
		$scope.totalDisplayed = $scope.totalResults;
	};

	$scope.checkAll = function(event) {
		var $button = angular.element(event.target);
		if($scope.emails.includedEmails.length == $scope.totalResults) {
			$scope.emails.includedEmails = [];
			$button.val("Check All");
		}else{
			$scope.emails.includedEmails = angular.copy($scope.emailList);
			$button.val("Uncheck All");
		}
	};
}]);


