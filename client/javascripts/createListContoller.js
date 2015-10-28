app.controller('createListSearch', ['$scope', '$http', 'ContactListDataService', 'newContactListData', function ($scope, $http, ContactListDataService,newContactListData) {
    $scope.type ={};
    $scope.age={};
    $scope.zip={};
    $scope.includedEmails =[];
	$scope.totalDisplayed = 50;
	$scope.totalResults = 0;

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
                })
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
        console.log($scope.includedEmails);
        newContactListData.popList($scope.includedEmails);
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
		if($scope.includedEmails.length == $scope.totalResults) {
			$scope.includedEmails = [];
			$('#createResults input[type="checkbox"]').attr('checked', false);
			$button.val("Check All");
		}else{
			$scope.includedEmails = angular.copy($scope.emailList);
			$button.val("Uncheck All");
		}

	};
}]);


